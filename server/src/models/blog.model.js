import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

blogSchema.pre("save", async function (next) {
  this.slug = this.title
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z\d\s]+/g, "-")
    .replace(/\s/g, "-");
});

export const Blog = mongoose.model("Blog", blogSchema);
