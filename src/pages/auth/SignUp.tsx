import  { useState } from 'react';
import { Link } from 'react-router-dom';
import assets from '../../assets/assets';
import Input from '../../components/Inputs/input';
import { EMAIL_REGEX } from '../../util/pattern'
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseRegistrationMutation } from '../../api/queries/query-functions/authentication.service';
import { ProfileUploadSelector } from '../../components/ProfileUploadSelector/profileUploadSelector';
import uploadProfileImage from '../../util/uploadProfileImage';


export const singUpSchema = z.object({
  fullName: z.string()
    .min(1, "Full Name is required")
    .max(50, "Full Name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(EMAIL_REGEX, "Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
});

type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
};

const SignUp = () => {

  const { mutateAsync: userRegister, isPending: loading } = UseRegistrationMutation();

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const [photoError, setPhotoError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(singUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });



  const handleSignUp =  async(data: SignUpFormData) => {    
    if (!profilePhoto) {    
      setPhotoError("Profile photo is required");
      return;
    }else{
      const imageUrl = await uploadProfileImage(profilePhoto);
      setProfilePhoto(imageUrl as unknown as File);
    }
    setPhotoError(null);

    const payloadData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      profileImageUrl: profilePhoto ? URL.createObjectURL(profilePhoto) : undefined
    };
    userRegister(payloadData);
  }


  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left side - Signup form */}
      <div className="flex flex-col justify-center h-full bg-white/10 items-center w-full md:w-1/2 p-6 md:p-1">
        <div className='text-2xl md:text-4xl font-bold mb-6 md:mb-20'>ExpenseTracker</div>
        <div className='z-30 p-8 w-full md:w-4/5 lg:w-3/4 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md'>
          <div className='my-6'>
            <h1 className="md:text-3xl font-bold text-2xl  text-gray-800">Create an Account</h1>
            <div className='text-gray-500 text-md md:text-lg'>Start your journey to financial clarity</div>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="w-full">
            <ProfileUploadSelector profilePhoto={profilePhoto}
              setProfilePhoto={setProfilePhoto}
              error={photoError ?? undefined} />
            <div className="mb-6 space-y-2">
              <Input
                label='Full Name'
                type="name"
                placeholder="Full Name"
                error={errors?.fullName?.message}
                {...register("fullName")}
              />
              <Input
                label="Email address"
                type="email"
                placeholder="Enter your email"
                error={errors?.email?.message}
                {...register("email")}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"

                error={errors?.password?.message}
                {...register("password")}
              />
            </div>
            <button
              type="submit"
              className="w-full mb-4 bg-purple-500 shadow-2xl z-30  text-white py-3 rounded-lg hover:bg-purple-800 transition-all"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
        <div className='flex text-lg mt-[50px]'>Already have an account?<Link to={'/login'} className='mx-2 text-blue-600'>Log In </Link></div>
      </div>

      {/* Right side - Background Image */}
      <div className="relative w-full md:w-1/2 hidden md:block h-64 opacity-50  md:h-auto">
        <img
          src={assets.sign_up_image}
          alt="Sign Up Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

      </div>
    </div >

  );
};

export default SignUp;  