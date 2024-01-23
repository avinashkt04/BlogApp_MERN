import React, { useState, useEffect } from "react";
import { Input, Button, Spinner } from "../components";
import { useForm } from "react-hook-form";
import { changePasswordAPI } from "../store/services/userAction";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "../store/features/userSlice";

function Settings() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [error, setError] = useState(null);

  const message = useSelector((state) => state.user.message);
  const success = useSelector((state) => state.user.success);
  const loading = useSelector((state) => state.user.loading);

  const changePassword = (data) => {
    if (!data.password || !data.newPassword || !data.confNewPassword) {
      setError("All fields required");
      return;
    }
    if (data.newPassword !== data.confNewPassword) {
      setError("New Password and Confirm Password should be same");
      return;
    }
    setError("");
    dispatch(changePasswordAPI(data));
  };

  useEffect(() => {
    dispatch(resetUserState())
  }, [])

  useEffect(() => {
    if (message && !success) {
      setError(message);
    }
  }, [message]);

  useEffect(() => {
    return () => dispatch(resetUserState());
  }, []);

  if (error || success) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center flex-col w-[90%] max-w-lg py-2">
        <div className="w-full px-2 mt-2">
          <h2 className="text-2xl font-bold underline">
            Change Current Password:
          </h2>
        </div>

        {error && (
          <div className="flex py-1 px-2 mt-2 justify-center items-center bg-red-600 w-full border border-gray-300 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="flex py-1 px-2 mt-2 justify-center items-center bg-green-600 w-full border border-gray-300 rounded-md">
            <p>Password Changed Successfully</p>
          </div>
        )}

        <div className="flex flex-col items-center justify-center py-4 px-3 border border-gray-300 rounded-xl bg-[#3c3e57] w-full my-2">
          <form
            className="w-full max-w-sm m-2 px-2 space-y-3"
            onSubmit={handleSubmit(changePassword)}
          >
            <Input
              label="Password : "
              placeholder="Enter your old password"
              type="password"
              {...register("password")}
            />

            <Input
              label="New Password : "
              placeholder="Enter new password"
              type="password"
              {...register("newPassword", {
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters.",
                },
              })}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-600 mx-2">
                {errors.newPassword.message}
              </p>
            )}

            <Input
              label="Confirm New Password : "
              placeholder="Confirm new password"
              type="password"
              {...register("confNewPassword")}
            />

            <div>
              <Button
                className="w-[calc(100%-1rem)] ml-2 bg-blue-500 mt-3 hover:transform-gpu hover:scale-[1.01] hover:bg-blue-600 active:bg-blue-700"
                type="submit"
              >
                {loading ? <Spinner className="w-6"/> : "Change Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
