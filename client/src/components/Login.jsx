import React, { useEffect, useState } from "react";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginAPI } from "../store/services/userAction";
import { useDispatch, useSelector } from "react-redux";
import { resetPostState } from "../store/features/postSlice";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(null);

  const message = useSelector((state) => state.user.message);
  const success = useSelector((state) => state.user.success);

  const login = (data) => {
    if (!data.username || !data.password) {
      setErrorMsg("All fields required");
      return;
    }
    setErrorMsg(null);
    dispatch(loginAPI(data));
  };

  useEffect(() => {
    if (message && !success) {
      setErrorMsg(message);
    } else {
      setErrorMsg(null);
    }
  }, [message, success]);

  useEffect(() => {
    return () => dispatch(resetPostState());
  }, []);

  if (errorMsg) {
    setTimeout(() => {
      setErrorMsg(null);
    }, 3000);
  }

  return (
    <div className="flex justify-center items-center border-2 border-gray-300 w-[80%] max-w-md rounded-lg flex-col px-2 py-4 my-8">
      <Logo className="w-20" />
      <h2 className="text-2xl ">Login to your account :</h2>
      <div className="h-4 my-1">
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      </div>
      <form
        className="w-full max-w-sm m-2 px-2 space-y-3"
        onSubmit={handleSubmit(login)}
      >
        <Input
          label="Username : "
          placeholder="Enter your username"
          {...register("username")}
        />

        <Input
          label="Password : "
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />

        <div>
          <Button
            className="w-[calc(100%-1rem)] ml-2 bg-blue-500 mt-4 hover:transform-gpu hover:scale-[1.01] hover:bg-blue-600 active:bg-blue-700"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
      <p className="mt-2 text-center text-base text-white/60">
        Don&apos;t have an account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline cursor-pointer text-red-400"
        >
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
