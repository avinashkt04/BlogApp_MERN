import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  LinksModal,
  Spinner,
  TextForm,
} from "../components/index";
import { useForm } from "react-hook-form";
import {
  removeAvatarAPI,
  updateAvatarAPI,
  updateAccountAPI,
} from "../store/services/userAction";
import { useNavigate } from "react-router-dom";
import { resetUserState } from "../store/features/userSlice";
import { getAllPostAPI } from "../store/services/postAction";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const userInfo = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading);
  const message = useSelector((state) => state.user.message);
  const success = useSelector((state) => state.user.success);

  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      fullname: userInfo?.fullname,
      username: userInfo?.username,
      bio: userInfo?.bio || "",
      links: userInfo?.links || {},
    },
  });

  const updateAvatar = (data) => {
    const avatarFile = data.avatarFile[0];
    if (!avatarFile) {
      setError("File is missing");
      return;
    }
    setError("");
    dispatch(updateAvatarAPI(avatarFile));
    reset();
  };

  const removeAvatar = () => {
    dispatch(removeAvatarAPI());
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateAccount = (data) => {
    if (!data.fullname) {
      setError("Fullname required");
      return;
    }

    if (!data.username) {
      setError("Username required");
      return;
    }

    dispatch(updateAccountAPI(data));
  };

  useEffect(() => {
    if (message && !success) {
      setError(message);
    }

    if (success && message) {
      navigate(`/${userInfo?.username}/profile`);
    }
  }, [message]);

  useEffect(() => {
    return () => {
      dispatch(resetUserState());
      dispatch(getAllPostAPI());
    }
  }, []);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center flex-col w-[90%] max-w-xl">
        <h2 className="text-2xl font-bold my-2">Edit Profile</h2>

        <form
          onSubmit={handleSubmit(updateAvatar)}
          className="flex items-center justify-between py-2 px-2 border border-gray-300 rounded-xl bg-[#3c3e57] w-full my-2"
        >
          {loading ? (
            <Spinner className="w-16" />
          ) : (
            <img
              src={userInfo?.avatar}
              alt="profile"
              className="w-16 h-16 rounded-full"
            />
          )}

          <div className="flex w-[80%]">
            <Input
              type="file"
              accept="image/*"
              className="w-[85%] sm:block sm:w-[90%]"
              {...register("avatarFile")}
            />
            <Button
              className="bg-blue-500 hover:transform-gpu hover:scale-[1.02] active:bg-blue-700"
              type="submit"
            >
              Update
            </Button>
            {userInfo?.avatar !== import.meta.env.VITE_DEFAULT_AVATAR && (
              <Button
                className="bg-red-500 hover:transform-gpu hover:scale-[1.02] active:bg-red-700"
                onClick={removeAvatar}
              >
                <i className="fa-solid fa-trash"></i>
              </Button>
            )}
          </div>
        </form>

        {error && (
          <div className="flex py-1 px-2 justify-center items-center bg-red-600 w-full border border-gray-300 rounded-md">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col items-center justify-center py-2 px-3 border border-gray-300 rounded-xl bg-[#3c3e57] w-full my-2">
          <form
            className="w-full max-w-sm m-2 px-2 space-y-3"
            onSubmit={handleSubmit(updateAccount)}
          >
            <Input
              label="Full Name : "
              placeholder="Enter full name"
              {...register("fullname")}
            />

            <Input
              label="Username : "
              placeholder="Enter username"
              {...register("username")}
            />

            <TextForm
              label="Bio : "
              placeholder="Enter something about you..."
              {...register("bio")}
            />

            <div>
              <Button
                onClick={openModal}
                className="ml-2 bg-green-500 hover:transform-gpu hover:scale-[1.01] hover:bg-green-600 active:bg-green-700"
              >
                Add Links
              </Button>

              <LinksModal
                isOpen={isModalOpen}
                onClose={closeModal}
                links={getValues("links")}
              />
            </div>

            <div>
              <Button
                className="w-[calc(100%-1rem)] ml-2 bg-blue-500 mt-4 hover:transform-gpu hover:scale-[1.01] hover:bg-blue-600 active:bg-blue-700"
                type="submit"
              >
                {loading ? <Spinner className="w-6"/> : "Update Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
