import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAPI,
  getAllPostAPI,
  getPostAPI,
} from "../store/services/postAction";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { resetPostState } from "../store/features/postSlice";
import { Spinner, Button } from "../components";
import parse from "html-react-parser";

function Post() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const postInfo = useSelector((state) => state.post.postInfo);
  const success = useSelector((state) => state.post.success);
  const message = useSelector((state) => state.post.message);
  const loading = useSelector((state) => state.post.loading);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getPostAPI(slug));
  }, []);

  const deletePost = () => {
    dispatch(deletePostAPI(slug));
    setShowDeleteConfirmation(false);
  };

  if (message && success) {
    console.log(message);
    navigate(`/${userInfo?.username}/all-posts`);
    dispatch(getAllPostAPI());
  }

  useEffect(() => {
    return () => dispatch(resetPostState());
  }, []);
  return (
    <div className="flex justify-center items-center flex-col py-2">
      {!postInfo?.featuredImage ? (
        <Spinner />
      ) : (
        <div className="w-[90%] max-w-2xl">
          {userInfo?.username === postInfo?.author?.username && (
            <div className="pt-3 flex items-center justify-end ">
              <Button
                className="bg-black hover:transform-gpu hover:scale-105 active:bg-gray-900"
                onClick={() =>
                  navigate(`/${userInfo?.username}/${postInfo?.slug}/edit`)
                }
              >
                <i className="fa-solid fa-pen-to-square mr-2"></i>
                Edit Post
              </Button>
              <Button
                className="bg-red-600 hover:transform-gpu hover:scale-105 active:bg-gray-900"
                onClick={() =>
                  setShowDeleteConfirmation(!showDeleteConfirmation)
                }
              >
                {loading ? <Spinner width="w-4" /> : "Delete Post"}
              </Button>
            </div>
          )}
          {/* {showDeleteConfirmation &&} */}
          {showDeleteConfirmation && (
            <div className="flex py-1 px-2 mt-2 justify-center items-center bg-red-600 w-full border border-gray-300 rounded-md flex-wrap">
              <p className="text-lg">Post will be deleted permanently.</p>
              <div className="flex">
                <Button
                  className="bg-white hover:transform-gpu hover:scale-105 text-black"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-white hover:transform-gpu hover:scale-105 text-black"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
          <h1 className="text-3xl my-4">{postInfo?.title}</h1>
          <div className="my-2">
            <img
              src={postInfo.featuredImage}
              alt={postInfo?.title}
              className="w-full h-[12rem] sm:h-[18rem] rounded-xl"
            />
          </div>
          <div className="flex justify-between items-center my-4 flex-wrap text-gray-300 pb-2 border-b-2 border-gray-500">
            <div
              className="flex items-center space-x-2 cursor-pointer hover:transform-gpu hover:scale-105"
              onClick={() => navigate(`/${postInfo?.author?.username}/profile`)}
            >
              <img
                src={postInfo?.author?.avatar}
                alt={"avatar"}
                className="w-8 h-8 rounded-full"
              />
              <p className="text-md">{postInfo?.author?.username}</p>
            </div>
            <time>
              {postInfo?.createdAt
                ? format(postInfo?.createdAt, "MMMM dd, yyyy")
                : "Invalid Date"}
            </time>
          </div>
          <div className="text-md content">
            {postInfo.content && parse(postInfo.content)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
