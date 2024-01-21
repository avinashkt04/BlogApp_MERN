import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { StatusCodes } from "http-status-codes";

// Create a new Blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "All fields required");
  }

  const existedTitle = await Blog.findOne({ title });

  if (existedTitle) {
    return res
      .status(StatusCodes.CONFLICT)
      .json(new ApiResponse(StatusCodes.CONFLICT, {}, "Title already existed"));
  }

  const featuredImageLocalPath = req.file?.path;
  if (!featuredImageLocalPath) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Featured Image is required");
  }

  const featuredImage = await uploadOnCloudinary(featuredImageLocalPath);

  if (!featuredImage) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Featured Image is required");
  }

  const blog = await Blog.create({
    title,
    featuredImage: featuredImage?.url,
    content,
    status: "active",
    author: req.user,
  });

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, blog, "Blog created successfully"));
});

// Fetching all blogs
const getAllBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", ["username", "avatar"])
    .sort({ createdAt: -1 });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, blogs, "All Blogs fetched successfully")
    );
});

// Edit Blog
const editBlog = asyncHandler(async (req, res) => {
  const { title, content, status } = req.body;

  if ([title, content, status].some((field) => field?.trim() === "")) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "All fields required");
  }

  let blog = await Blog.findOne({ slug: req.params.slug });

  if (!blog) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  const featuredImageLocalPath = req.file?.path;
  let featuredImage;

  if (featuredImageLocalPath) {
    featuredImage = await uploadOnCloudinary(featuredImageLocalPath);
    const oldFeaturedImageURL = blog?.featuredImage;
    const oldFeaturedImagePublicId = oldFeaturedImageURL
      .split("/v")[1]
      .split("/")[1]
      .split(".")[0];
    await deleteFromCloudinary(oldFeaturedImagePublicId);
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Not allowed to edit the blog"
    );
  }

  const existedTitle = await Blog.findOne({ title });

  if (existedTitle && blog?.title !== title) {
    return res
      .status(StatusCodes.CONFLICT)
      .json(
        new ApiResponse(StatusCodes.CONFLICT, blog, "Title already existed")
      );
  }

  const updatedBlogData = {
    ...(title && { title }),
    ...(content && { content }),
    ...(featuredImage && { featuredImage: featuredImage.url }),
    ...(status && { status }),
  };

  const id = blog?.id;

  blog = await Blog.findByIdAndUpdate(
    id,
    {
      $set: updatedBlogData,
    },
    { new: true }
  );

  await blog.save({ validateBeforeSave: false });

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, blog, "Blog edited successfully"));
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  let blog = await Blog.findOne({ slug: req.params.slug });

  if (!blog) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Blog not found");
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Not allowed to edit the blog"
    );
  }

  const id = blog?._id;

  blog = await Blog.findByIdAndDelete(id);

  const featuredImageURL = blog?.featuredImage;
  const featuredImagePublicId = featuredImageURL
    .split("/v")[1]
    .split("/")[1]
    .split(".")[0];

  await deleteFromCloudinary(featuredImagePublicId);

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, {}, "Blog deleted successfully"));
});

// Get single Blog
const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug }).populate(
    "author",
    ["username", "avatar"]
  );

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, blog, "Blog fetched successfully"));
});

export { createBlog, getAllBlog, editBlog, deleteBlog, getSingleBlog };
