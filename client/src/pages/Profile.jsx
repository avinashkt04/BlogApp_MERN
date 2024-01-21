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
  return (
    <div>
      {!loading ? (
        <div>
          <ProfileComponent {...profileInfo} />
          <div className="flex flex-wrap justify-center">
            {userInfo?.username === username && (
              <div className="w-full flex justify-center items-center">
                <Button
                  className={`w-[43%] bg-[#3c3e57]  hover:bg-[#252527] ${
                    activePost && "scale-105 bg-[#252527]"
                  }`}
                  onClick={() => setActivePost(true)}
                >
                  Active Post
                </Button>
                <Button
                  className={`w-[43%] bg-[#3c3e57]  hover:bg-[#27272b] ${
                    !activePost && "scale-105 bg-[#252527]"
                  }`}
                  onClick={() => setActivePost(false)}
                >
                  Inactive Post
                </Button>
              </div>
            )}
            {allPost
              .filter(
                (post) =>
                  post.author.username === profileInfo?.username &&
                  post.status === `${activePost ? "active" : "inactive"}`
              )
              .map((post) => (
                <div className="w-full max-w-[18rem] m-3" key={post._id}>
                  <PostCard {...post} />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <Spinner width="9" />
      )}
    </div>
  );
}

export default Profile;
