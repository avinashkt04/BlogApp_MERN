import React from "react";
import { useSelector } from "react-redux";
import { PostCard, Spinner } from "../components";

function AllPosts() {
  const allPost = useSelector((state) => state.post.allPost);
  const loading = useSelector((state) => state.post.loading);
  return (
    <div className="flex flex-wrap justify-center">
      {!loading ? (
        allPost
          .filter((post) => post.status === "active")
          .map((post) => (
            <div className="w-full max-w-[18rem] m-3" key={post._id}>
              <PostCard {...post} />
            </div>
          ))
      ) : (
        <Spinner className="w-9" />
      )}
    </div>
  );
}

export default AllPosts;
