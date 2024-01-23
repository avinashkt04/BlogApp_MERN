import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StatusCodes } from "http-status-codes";

// Register using email and password
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, password } = req.body;

  if ([fullname, username, password].some((field) => field?.trim === "")) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
  }

  const existedUser = await User.findOne({ username });

  if (existedUser) {
    return res
      .status(StatusCodes.CONFLICT)
      .json(new ApiResponse(StatusCodes.CONFLICT, {}, "User already exists"));
  }

  const user = await User.create({
    fullname,
    avatar: process.env.DEFAULT_AVATAR,
    coverImage: process.env.DEFAULT_COVER_IMAGE,
    username,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  const token = await user.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  if (!createdUser) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while registering the user"
    );
  }

  return res
    .status(StatusCodes.CREATED)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        {
          user: createdUser,
          token,
        },
        "User registered Successfully"
      )
    );
});

// Login using email and password
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new ApiResponse(StatusCodes.UNAUTHORIZED, {}, "Invalid Credentials")
      );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new ApiResponse(StatusCodes.UNAUTHORIZED, {}, "Invalid Credentials")
      );
  }

  const token = await user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(StatusCodes.OK)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        {
          user: loggedInUser,
          token,
        },
        "User logged in successfully"
      )
    );
});

// Logout
const logoutUser = asyncHandler(async (_, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(StatusCodes.OK)
    .cookie("token", options)
    .json(new ApiResponse(StatusCodes.OK, {}, "User logged out"));
});

// Current User
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        req.user,
        "Current user fetched successfully"
      )
    );
});

// UpdateUserAccount
const userAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, username, bio, addLinks } = req.body;

  if (!fullname || !username) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Fullname and Username are required"
    );
  }

  const existedUser = await User.findOne({ username });

  if (existedUser && req.user.username !== username) {
    return res
      .status(StatusCodes.CONFLICT)
      .json(
        new ApiResponse(
          StatusCodes.CONFLICT,
          req.user,
          "Username already existed"
        )
      );
  }

  const updateUser = {
    fullname,
    username,
    bio,
  };

  if (addLinks) {
    updateUser.links = addLinks;
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,

    {
      $set: updateUser,
    },
    {
      new: true,
    }
  ).select("-password");

  const newToken = await user.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(StatusCodes.OK)
    .cookie("token", newToken, options)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        {
          user,
          newToken
        },
        "Account details updated successfully"
      )
    );
});

// ChangeCurrentPassword
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        new ApiResponse(StatusCodes.NOT_FOUND, {}, "Incorrect old password")
      );
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, {}, "Password Changed Successfully"));
});

// UpdateUserAvatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Avatar file is missing");
  }

  const oldAvatarURL = req.user?.avatar;

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error while uploading on avatar"
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  if (oldAvatarURL !== process.env.DEFAULT_AVATAR) {
    const avatarPublicId = oldAvatarURL
      .split("/v")[1]
      .split("/")[1]
      .split(".")[0];
    await deleteFromCloudinary(avatarPublicId);
  }

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, user, "Avatar image changed successfully")
    );
});

// RemoveUserAvatar
const removeUserAvatar = asyncHandler(async (req, res) => {
  const oldAvatarURL = req.user?.avatar;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: process.env.DEFAULT_AVATAR,
      },
    },
    { new: true }
  ).select("-password");

  if (oldAvatarURL !== process.env.DEFAULT_AVATAR) {
    const avatarPublicId = oldAvatarURL
      .split("/v")[1]
      .split("/")[1]
      .split(".")[0];
    await deleteFromCloudinary(avatarPublicId);
  }

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, user, "Avatar removed successfully"));
});

// GetUserProfile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select(
    "-password"
  );

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, user, "User profile fetched successfully")
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  userAccountDetails,
  changeCurrentPassword,
  updateUserAvatar,
  removeUserAvatar,
  getUserProfile,
};
