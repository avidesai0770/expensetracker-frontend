
export interface updateProfileRequest{
    fullName?: string,
    email?: string,
    profileImageUrl?:string
}

export interface updateProfileResponse{
    fullName?: string,
    email?: string,
    profileImageUrl?:string
    createdAt:string
}