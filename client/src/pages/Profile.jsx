import React, { useEffect, useState } from "react";
import {
  Spinner,
  PostCard,
  Profile as ProfileComponent,
  Button,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfileAPI } from "../store/services/profileAction";
import { resetProfileState } from "../store/features/profileSlice";

function Profile() {
  const [activePost, setActivePost] = useState(true);
  const allPost = useSelector((state) => state.post.allPost);
  const userInfo = useSelector((state) => state.user.userInfo);
  const profileInfo = useSelector((state) => state.profile?.profileInfo);
  const loading = useSelector((state) => state.profile?.loading);
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileAPI(username));
  }, [dispatch, username]);

  useEffect(() => {
    return () => dispatch(resetProfileState());
  }, []);

  const filteredPosts = allPost.filter(
    (post) =>
      post?.author?.username === profileInfo?.username &&
      post?.status === `${activePost ? "active" : "inactive"}`
  );

  
  const isUserProfileOwner = userInfo?.username === username;
const shouldRenderButtons = isUserProfileOwner && allPost.some(post => post?.author?.username === profileInfo?.username);

return (
  <div>
    {!loading ? (
      <div>
        <ProfileComponent {...profileInfo} />
        <div className="flex flex-wrap justify-center">
          {shouldRenderButtons && (
            <div className="w-full flex justify-center items-center">
              <Button
                className={`w-[43%]  hover:bg-[#252527] ${
                  activePost ? "scale-105 bg-[#252527]" : "bg-[#3c3e57]"
                }`}
                onClick={() => setActivePost(true)}
              >
                Active Post
              </Button>
              <Button
                className={`w-[43%] hover:bg-[#27272b] ${
                  !activePost ? "scale-105 bg-[#252527]" : "bg-[#3c3e57]"
                }`}
                onClick={() => setActivePost(false)}
              >
                Inactive Post
              </Button>
            </div>
          )}
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div className="w-full max-w-[18rem] m-3" key={post._id}>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            shouldRenderButtons && (
              <div className="w-full max-w-[18rem] m-3 text-center">
                <p>No {activePost ? "active" : "inactive"} posts available</p>
              </div>
            )
          )}
        </div>
      </div>
    ) : (
      <Spinner className="w-9" />
    )}
  </div>
);

}

export default Profile;
