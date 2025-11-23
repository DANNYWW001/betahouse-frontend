import React, { useState } from "react";
import AuthWrapper from "../components/layout/AuthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { twMerge } from "tailwind-merge";
import axiosInstance from "../api/Axios";

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "Min 2 chars"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Min 2 chars"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("Password is required").min(6, "Min 6 chars"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms & conditions"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      repeatPassword: data.confirmPassword, 
    };

    try {
      const res = await axiosInstance.post("/auth/register", payload);

      if (res.status === 201) {
        alert("Registration successful! Please log in.");
        localStorage.setItem("registeredEmail", data.email);
        navigate("/login");
      }
    } catch (error) {
      console.error("Register error:", error);
      const resp = error.response?.data;

      if (resp?.errors?.length) {
        setErrorMessage(resp.errors[0].msg);
      } else {
        setErrorMessage(resp?.message || "Registration failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthWrapper>
      <div className="lg:p-[50px] lg:pl-[80px] md:w-[600px]">
        <h1 className="text-gray-900 dark:text-gray-100 font-semibold text-[22px] md:text-[28px] mb-3 leading-snug">
          Join our community of home seekers and explore the possibilities that
          await.
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-[16px] mb-5">
          Let’s get started by filling out the information below
        </p>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* First Name */}
            <div className="flex-1">
              <label
                htmlFor="fname"
                className="block mb-1 text-gray-700 dark:text-gray-300"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                {...register("firstName")}
                placeholder="Enter Name"
                className={twMerge(
                  "w-full px-3 py-3 border-2 rounded-md outline-none placeholder:text-gray-400 bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600",
                  errors.firstName && "border-red-400"
                )}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="lname"
                className="block mb-1 text-gray-700 dark:text-gray-300"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                {...register("lastName")}
                placeholder="Enter Name"
                className={twMerge(
                  "w-full px-3 py-3 border-2 rounded-md outline-none placeholder:text-gray-400 bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600",
                  errors.lastName && "border-red-400"
                )}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your Email"
              className={twMerge(
                "w-full px-3 py-3 border-2 rounded-md outline-none placeholder:text-gray-400 bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600",
                errors.email && "border-red-400"
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              className={twMerge(
                "w-full px-3 py-3 border-2 rounded-md outline-none placeholder:text-gray-400 bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600",
                errors.password && "border-red-400"
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="cpassword"
              className="block mb-1 text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              {...register("confirmPassword")}
              placeholder="Confirm your password"
              className={twMerge(
                "w-full px-3 py-3 border-2 rounded-md outline-none placeholder:text-gray-400 bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600",
                errors.confirmPassword && "border-red-400"
              )}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              {...register("terms")}
              className={`w-5 h-5 accent-[#3D9970] ${
                errors.terms ? "ring-2 ring-red-200" : ""
              }`}
            />
            <label
              htmlFor="terms"
              className="text-gray-700 dark:text-gray-300 text-[15px]"
            >
              I agree to{" "}
              <span className="text-[#3D9970]">Terms of Service</span> and
              <span className="text-[#3D9970]"> Privacy Policies</span>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="bg-[#3D9970] w-full h-[56px] rounded-xl text-white font-medium text-lg hover:bg-[#31845e] transition disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-md text-white"></span>
            ) : (
              "Sign up"
            )}
          </button>

          <div className="flex items-center justify-center gap-3 w-full my-4">
            <span className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></span>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              or
            </p>
            <span className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></span>
          </div>

          <a
            href="https://accounts.google.com/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="border flex items-center gap-2 mb-4 justify-center 
                       border-[#000000] dark:border-gray-600 
                       w-full h-[64px] rounded-[15px] font-[400] text-[22px] 
                       text-[#292929] dark:text-white bg-white dark:bg-gray-800"
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </a>

          <div className="text-center text-[15px]">
            <span className="text-gray-700 dark:text-gray-300">
              Already have an account?
            </span>{" "}
            <Link to="/login" className="text-[#3D9970] font-medium">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
