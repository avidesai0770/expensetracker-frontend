import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';



const Input = React.forwardRef<HTMLInputElement, any>(
  ({ label, error, type = "text", className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const isPasswordField = type === "password";

    return (
      <div className={`flex flex-col relative w-full ${className}`}>
        {label && (
          <label className="font-semibold text-gray-700 mb-1">{label}</label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={isPasswordField && showPassword ? "text" : type}
            className={`w-full border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg p-2 pr-10 focus:outline-none`}
            {...props}
          />

          {isPasswordField && (
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
