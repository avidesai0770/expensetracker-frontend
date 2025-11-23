
import { Card, CardContent } from "../ui/HoverCard/hoverCard";
import { Award } from "lucide-react";

import {
  Root as Avatar,
  Image as AvatarImage,
  Fallback as AvatarFallback,
} from "@radix-ui/react-avatar";
import { Badge } from "../ui/Badge/badge";
import type { updateProfileResponse } from "../../types/Profile/profile";
import useDashboardDetailsStore from "../../Store/Dashboard/useDasboardDetailStore";



type ProfileUploadSelectorProps = {
  profilePhoto: File | null;
  totalBalance:number;
  totalTransactions:number;
  setProfilePhoto: (file: File | null) => void;
  error?: string; // optional validation error
  userDetails?: updateProfileResponse
};


const ProfileCard = ({userDetails,totalBalance,totalTransactions}: ProfileUploadSelectorProps) => {
  return (
    <>
      <Card className="bg-gradient-to-br from-green-500 via-white-300 to-green-700 border-0 text-white shadow-xl">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div

              className="relative h-24 w-24 flex items-center justify-center"
            >
              <Avatar className="w-24 h-24 ring-4 ring-white/30 rounded-full overflow-hidden">
                <AvatarImage
                  src={userDetails?.profileImageUrl || undefined}
                  className="w-full h-full object-cover"
                />

                <AvatarFallback className="flex w-full h-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <p> {userDetails?.fullName}</p>
                <Badge className="bg-white/20 text-white border-white/30 w-fit mx-auto md:mx-0">
                  <Award className="w-3 h-3 mr-1" />
                  Premium Member
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-blue-100">Member Since</p>
                  <p className="text-white">{userDetails &&
                    new Date(userDetails.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-blue-100">Total Transactions</p>
                  <p className="text-white">{totalTransactions}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-blue-100">Total Savings</p>
                  <p className="text-white">₹ {totalBalance}</p>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
      
    </>
  );
};

export default ProfileCard;
