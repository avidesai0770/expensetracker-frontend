

import assets from '../../assets/assets';
import Input from '../../components/Inputs/input';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

// @ts-ignore: pattern.js has no declaration file; suppress implicit any error
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../util/pattern';
import {UseLoginMutation} from '../../api/queries/query-functions/authentication.service';



type LoginFormData = {
  email: string;
  password: string;
};


export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(EMAIL_REGEX, "Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
});


const Login = () => {

  const {mutateAsync: userLogin,isPending: loading} = UseLoginMutation();



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });



  const handleLogin = async(data: any) => {
    
    const payload = {
      email: data.email,
      password: data.password
    };

      userLogin(payload)

  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left side - Signup form */}
      <div className="flex flex-col justify-center h-full bg-white/10 items-center w-full lg:w-1/2 p-6 md:p-1">
        <div className='text-2xl md:text-4xl  font-bold mb-6 md:mb-20'>ExpenseTracker</div>
        <div className='z-30 p-8 w-full md:w-4/5 lg:w-3/4 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md'>
          <div className='my-6'>
            <h1 className="md:text-3xl font-bold text-2xl  text-gray-800">Welcome Back!</h1>
            <div className='text-gray-500 text-md md:text-lg'>Login to your account.</div>
          </div>

          <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-6 space-y-5">

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
              {loading ? "Creating..." : "Login"}
            </button>
          </form>
          {/* <div className='z-10 w-full p-3 mt-4 md:w-4/5 lg:w-3/4 rounded-2xl shadow-xl bg-white/90 backdrop-blur-md'>
            <button
              type="submit"
              className="w-full border-1 border-gray-200 shadow-2xl z-20  text-black py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Create Account
            </button>
          </div> */}
        </div>

        <div className='flex text-lg mt-[50px]'>Dont have an account?<Link to={'/signup'} className='mx-2 text-blue-600'>Sign up </Link></div>
      </div>

      {/* Right side - Background Image */}
      <div className="relative w-full md:w-1/2 hidden lg:block h-64 opacity-50  md:h-auto">
        <img
          src={assets.sign_up_image}
          alt="Sign Up Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

      </div>
    </div >
  );
}

export default Login;