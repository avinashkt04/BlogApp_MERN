import React, { useEffect, useState } from "react";
import { PostForm } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAPI, createPostAPI } from "../store/services/postAction";
import { useNavigate } from "react-router-dom";
import { resetPostState } from "../store/features/postSlice";

function CreatePost() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const success = useSelector((state) => state.post.success);
  const username = useSelector((state) => state.user.userInfo?.username);
  const postSlug = useSelector((state) => state.post.postInfo?.slug);
  const message = useSelector((state) => state.post.message);
  const loading = useSelector((state) => state.post.loading);

  const createPost = (data) => {
    console.log(data.featuredImage);
    if (!data.title || !data.featuredImage || !data.content) {
      return setError("All fields required");
    }
    setError(null);
    dispatch(createPostAPI(data));
  };

  useEffect(() => {
    if (message && !success) {
      setError(message);
    }
  }, [message]);

  if (postSlug && message && success) {
    navigate(`/${username}/${postSlug}`);
    dispatch(getAllPostAPI());
  }
  useEffect(() => {
    return () => dispatch(resetPostState());
  }, []);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  return <PostForm error={error} postAction={createPost} loading={loading} />;
}

export default CreatePost;
