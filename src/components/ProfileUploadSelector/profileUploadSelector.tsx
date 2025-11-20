import { useEffect, useRef, useState } from "react";
import { User, Upload, X } from "lucide-react";

type ProfileUploadSelectorProps = {
  profilePhoto: File | null;
  setProfilePhoto: (file: File | null) => void;
  fullName?: string;
  error?: string;
};

export const ProfileUploadSelector = ({
  profilePhoto,
  setProfilePhoto,
  fullName = "",
  error,
}: ProfileUploadSelectorProps) => {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    // If profilePhoto is a string (URL), use it directly
    if (typeof profilePhoto === "string") {
      setPreviewUrl(profilePhoto);
      return;
    }

    // If profilePhoto is a File, create object URL
    if (profilePhoto instanceof File) {
      const url = URL.createObjectURL(profilePhoto);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [profilePhoto]);


  // Generate initials (e.g., "A D")
  const getInitials = () => {
    if (!fullName) return "";
    const words = fullName.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const initials = getInitials();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const clearImage = () => {
    setProfilePhoto(null);
    setPreviewUrl(undefined);
  };

  const onChooseFile = () => inputRef.current?.click();

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* IF NO PROFILE PHOTO */}
      {!profilePhoto ? (
        <button
          type="button"
          onClick={onChooseFile}
          className="relative h-24 w-24 flex items-center justify-center 
            bg-gradient-to-br ring-4 ring-white/30 from-purple-500 to-pink-500 text-white text-xl rounded-full 
            hover:bg-purple-100 transition-all  font-semibold"
        >
          {initials ? (
            <span>{initials}</span>
          ) : (
            <User size={40} className="text-purple-500" />
          )}

          <div className="absolute bottom-0 right-0 bg-purple-500 p-2 rounded-full shadow-md">
            <Upload size={16} className="text-white" />
          </div>
        </button>
      ) : (
        // IF IMAGE UPLOADED
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="h-24 w-24 rounded-full object-cover border-2 border-purple-300 shadow-md"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition"
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};
