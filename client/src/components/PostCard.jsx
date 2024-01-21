import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostCard({ featuredImage, title, author, createdAt, slug }) {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.userInfo?.username);
  return (
    <div
      className="w-full rounded-xl bg-[#3c3e57] p-3 shadow-xl cursor-pointer hover:transform-gpu hover:scale-105"
      onClick={() => navigate(`/${username}/${slug}`)}
    >
      <div className="overflow-hidden flex justify-center items-center">
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-48 rounded-lg"
        />
      </div>
      <div className="flex justify-between items-center my-3 flex-wrap text-gray-300 border-b border-gray-500 pb-2">
        <div className="flex items-center space-x-2">
          <img
            src={author?.avatar}
            alt={"avatar"}
            className="w-8 h-8 rounded-full"
          />
          <p className="text-sm">{author?.username}</p>
        </div>
        <time className="text-xs">
          {createdAt ? format(createdAt, "MMMM dd, yyyy") : "Invalid Date"}
        </time>
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
}

export default PostCard;
