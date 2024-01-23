import React, { useEffect, useState } from "react";
import { Button, Input, Logo, Spinner } from "./index";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupAPI } from "../store/services/userAction";
import { resetUserState } from "../store/features/userSlice";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const message = useSelector((state) => state.user.message);
  const success = useSelector((state) => state.user.success);
  const loading = useSelector((state) => state.user.loading);

  const signup = (data) => {
    if (
      !data.fullname ||
      !data.username ||
      !data.password ||
      !data.confirmpassword
    ) {
      setError("All fields required");
      return;
    }
    if (data.password !== data.confirmpassword) {
      setError("Password and Confirm Password should be same");
      return;
    }
    setError(null);
    dispatch(signupAPI(data));
  };

  useEffect(() => {
    if (message && !success) {
      setError(message);
    } else {
      setError(null);
    }
  }, [message, success]);

  useEffect(() => {
    return () => dispatch(resetUserState());
  }, []);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  return (
    <div className="flex justify-center items-center border-2 border-gray-300 w-[80%] max-w-md rounded-lg flex-col px-2 py-4 my-8">
      <Logo className="w-20" />
      <h2 className="text-2xl ">Sign up to create account</h2>
      <div className="h-4 my-1">
        {error && <p className="text-red-600">{error}</p>}
      </div>
      <form
        className="w-full max-w-sm m-2 px-2 space-y-3"
        onSubmit={handleSubmit(signup)}
      >
        <Input
          label="Full Name : "
          placeholder="Enter your full name"
          {...register("fullname")}
        />

        <Input
          label="Username : "
          placeholder="Enter your username"
          {...register("username", {
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/,
              message:
                "Username must have at least one uppercase letter, one lowercase letter, one digit, and a minimum length of 5 characters.",
            },
          })}
        />
        {errors.username && (
          <p className="text-sm text-red-600 mx-2">{errors.username.message}</p>
        )}

        <Input
          label="Password : "
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters.",
            },
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-600 mx-2">{errors.password.message}</p>
        )}

        <Input
          label="Confirm Password : "
          type="password"
          placeholder="Confirm your password"
          {...register("confirmpassword")}
        />

        <div>
          <Button
            className="w-[calc(100%-1rem)] ml-2 bg-green-500 mt-4 hover:transform-gpu hover:scale-[1.01] hover:bg-green-600 active:bg-green-700"
            type="submit"
          >
            {loading ? <Spinner className="w-6" /> : "Signup"}
          </Button>
        </div>
      </form>
      <p className="mt-2 text-center text-base text-white/60">
        Already have an account&nbsp;
        <Link
          to="/"
          className="font-medium text-primary transition-all duration-200 hover:underline cursor-pointer text-red-400"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
