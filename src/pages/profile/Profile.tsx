import { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard/profileCard";
import { ProfileUploadSelector } from "../../components/ProfileUploadSelector/profileUploadSelector";
import { useGetUserDetails } from "../../api/queries/query-functions/authentication.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/HoverCard/hoverCard";
import { Award, Edit2, Save, Target, TrendingUp, X } from "lucide-react";
import { Button } from "../../components/ui/Button/button";
import Input from "../../components/Inputs/input";
import z from "zod";
import { EMAIL_REGEX } from "../../util/pattern";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseProfileUpdateMutation } from "../../api/queries/query-functions/user.service";
import { convertFileToBase64 } from "../../util/base64Converter";
import SecuritySettings from "../../components/SecuritySettings/securitySetting";
import useDashboardDetailsStore from "../../Store/Dashboard/useDasboardDetailStore";



export const UpdateSchema = z.object({
    fullName: z.string()
        .min(1, "Full Name is required")
        .max(50, "Full Name must be less than 50 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .regex(EMAIL_REGEX, "Enter a valid email address"),
});

type updateProfileData = {
    fullName: string;
    email: string;
};


const Profile = () => {

    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [photoError, setPhotoError] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { mutateAsync: getUserDetails } = useGetUserDetails();
    const { mutateAsync: updateProfile } = UseProfileUpdateMutation();

    const { totalCategory } =
        useDashboardDetailsStore();

    const rawDashboard = localStorage.getItem("dashboard-details");
    const totalBalance: any = rawDashboard ? JSON.parse(rawDashboard) : null;

console.log('tpt',totalBalance);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserDetails();
                setUserInfo(response);   // <-- STORE RESPONSE
            } catch (error) {
                console.error("Error fetching user details", error);
            }
        };

        fetchUser();
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<updateProfileData>({
        defaultValues: {
            fullName: "",
            email: "",
        },
        resolver: zodResolver(UpdateSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    });


    const onSubmit = async (data: updateProfileData) => {
        try {
            if (!profilePhoto) {
                setPhotoError("Profile photo is required");
                return;
            }

            setPhotoError(null);
            let profileImageUrl: string | undefined;
            if (profilePhoto instanceof Blob) {
                profileImageUrl = await convertFileToBase64(profilePhoto);
            } else if (typeof profilePhoto === 'string') {

                profileImageUrl = profilePhoto;
            } else {
                throw new TypeError('Unsupported profilePhoto type');
            }

            const payloadData = {
                fullName: data.fullName,
                email: data.email,
                profileImageUrl
            };

            console.log("Form submitted data:", payloadData);
            await updateProfile(payloadData);
        } catch (err) {
            console.error('Submit error:', err);
            setPhotoError('Failed to process profile photo');
        }
    };

    useEffect(() => {
        if (userInfo) {
            reset({
                fullName: userInfo.fullName || "",
                email: userInfo.email || "",
            });
            setProfilePhoto(userInfo?.profileImageUrl)
        }
    }, [userInfo, reset]);


    return (
        <div className='max-w-7xl mx-auto space-y-6'>
            <div>
                <h1 className="text-neutral-900 mb-1">Profile Settings</h1>
                <p className="text-neutral-600">Manage your account settings and preferences</p>
            </div>
            <ProfileCard totalBalance={totalBalance?.state?.totalBalance} totalTransactions={totalBalance?.state?.totalTransactions} userDetails={userInfo} profilePhoto={profilePhoto}
                setProfilePhoto={setProfilePhoto} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-neutral-600">Monthly Average</p>
                                <p className="text-neutral-900">₹4,850</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <Target className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-neutral-600">Savings Goal</p>
                                <p className="text-neutral-900">75% Complete</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                                <Award className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-neutral-600">Active Categories</p>
                                <p className="text-neutral-900">{totalBalance?.state?.totalCategory}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader className="border-b border-neutral-200/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Update your profile photo and account details</CardDescription>
                            </div>

                            {!isEditing ? (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="border-neutral-200"
                                >
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="bg-linear-to-r text-white flex items-center hover:border bg-green-600 border-green-600 hover:bg-green-50 hover:text-green-600 shadow-lg py-2 px-3 rounded-xl shadow-blue-500/30"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </button>

                                    <button
                                        onClick={() => setIsEditing(false)}
                                        type="button"

                                        className="bg-linear-to-r text-black flex items-center hover:border bg-white-600 border-green-600 hover:bg-green-50 hover:text-green-600 shadow-lg py-2 px-3 rounded-xl shadow-blue-500/30"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <div className="space-y-8">
                            {/* Profile Photo Section */}
                            <div
                                className={`pb-6 border-b border-neutral-200/50 ${!isEditing ? "opacity-60 pointer-events-none" : ""
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="relative h-24 w-24 flex items-center justify-center">
                                        <ProfileUploadSelector
                                            profilePhoto={profilePhoto}
                                            setProfilePhoto={setProfilePhoto}
                                            error={photoError ?? undefined}
                                            fullName="avi desai"
                                        />
                                    </div>

                                    <div className="flex-1 space-y-4 w-full">
                                        <p className="text-neutral-900 mb-1">Update your profile photo</p>
                                        <p className="text-neutral-500">JPG, PNG or GIF. Max size 5MB</p>
                                    </div>
                                </div>

                                {/* Form Inputs */}
                                <div className="flex gap-4 mt-6">
                                    <Input
                                        type="name"
                                        label="Full Name"
                                        placeholder="Enter your full name"
                                        className="flex-1"
                                        error={errors?.fullName?.message}
                                        {...register("fullName")}
                                    />

                                    <Input
                                        label="Email address"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1"
                                        error={errors?.email?.message}
                                        {...register("email")}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </form>
            </Card>
            <SecuritySettings />
        </div>
    )
}

export default Profile;