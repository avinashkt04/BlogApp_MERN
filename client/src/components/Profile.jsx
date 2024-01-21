import React from "react";
import { useSelector } from "react-redux";
import { Button } from "./index";
import { useNavigate } from "react-router-dom";

function Profile({ avatar, username, fullname, bio, links }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center items-center flex-col bg-[#3c3e57] border border-[#242535] rounded-lg m-4 w-full py-8">
          <div className="flex items-center gap-2 ">
            <img
              src={avatar}
              alt="avatar"
              className="w-20 h-20 border border-[#3c3e57] rounded-full overflow-hidden"
            />
            <div>
              <h2 className="text-xl">{username}</h2>
              <h2 className="text">{fullname}</h2>
            </div>
          </div>
          {bio && (
            <div className="w-[75%] max-w-2xl text-center py-3">{bio}</div>
          )}
          <div className="flex gap-2 py- text-2xl">
            {links?.youtube && (
              <a target="_blank" href={links.youtube}>
                <i className="fa-brands fa-youtube"></i>
              </a>
            )}
            {links?.facebook && (
              <a target="_blank" href={links.facebook}>
                <i className="fa-brands fa-facebook"></i>
              </a>
            )}
            {links?.instagram && (
              <a target="_blank" href={links.instagram}>
                <i className="fa-brands fa-instagram"></i>
              </a>
            )}
            {links?.twitter && (
              <a target="_blank" href={links.twitter}>
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            )}
            {links?.other && (
              <a target="_blank" href={links.other}>
                <i className="fa-solid fa-globe"></i>
              </a>
            )}
          </div>
          {userInfo?.username === username && (
            <div className="pt-3">
              <Button
                className="bg-black hover:transform-gpu hover:scale-105 active:bg-gray-900"
                onClick={() => navigate(`/${userInfo.username}/profile/edit`)}
              >
                <i className="fa-solid fa-pen-to-square mr-2"></i>
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
