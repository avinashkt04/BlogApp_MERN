import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "../index";
import { Logo } from "../index";
import { logoutAPI } from "../../store/services/userAction";
import { resetUserState } from "../../store/features/userSlice";

function Header() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const authStatus = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dropdownRef = useRef(null);

  const navItems = [
    {
      name: "Login",
      path: "/",
      color: "blue",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      color: "green",
      active: !authStatus,
    },
    {
      name: "All Post",
      path: `${userInfo?.username}/all-posts`,
      color: "blue",
      active: authStatus,
    },
    {
      name: "Create Post",
      path: `${userInfo?.username}/create-post`,
      color: "green",
      active: authStatus,
    },
  ];

  const logout = () => {
    dispatch(logoutAPI());
    dispatch(resetUserState())
    setShowDropdown(false);
  };

  const handleNavigation = () => {
    navigate(`${userInfo?.username}/settings`);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
  }, [dropdownRef, setShowDropdown]);

  return (
    <header className="px-1 py-1 ">
      <nav className="flex justify-between">
        <div className="ml-1 sm:ml-5">
          <NavLink
            to={authStatus ? `/${userInfo?.username}/all-posts` : "/"}
            className="flex items-center"
          >
            <Logo className="w-16 " />
            <div className="text-xl hidden sm:flex">
              <span className="text-green-500">Free</span>
              <span className="text-purple-500">Write</span>
              <span className="text-red-500">Space</span>
            </div>
          </NavLink>
        </div>
        <ul className="flex ml-3 items-center">
          <div className="flex gap-1 sm:gap-2 mx-1 sm:mx-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink to={item.path}>
                      <Button
                        className={`bg-${item.color}-500 hover:transform-gpu hover:scale-105  active:bg-${item.color}-700`}
                      >
                        {item.name}
                      </Button>
                    </NavLink>
                  </li>
                )
            )}

            {authStatus && (
              <>
                <li>
                  <NavLink
                    to={`/${userInfo?.username}/profile`}
                    className="profile-link"
                  >
                    <img
                      src={userInfo?.avatar}
                      alt="profile"
                      className="w-11 h-11 border border-[#242535] rounded-full overflow-hidden cursor-pointer hover:border-2 hover:border-white"
                    />
                  </NavLink>
                </li>
                <li className="relative dropdown" ref={dropdownRef}>
                  <Button
                    className="space-y-1 cursor-pointer my-1 px-2"
                    onClick={toggleDropdown}
                  >
                    <div className="w-1 h-1 bg-white"></div>
                    <div className="w-1 h-1 bg-white"></div>
                    <div className="w-1 h-1 bg-white"></div>
                  </Button>
                  {showDropdown && (
                    <Dropdown
                      className="hover:bg-[#2d3557] active:bg-[#22283f]"
                      children={[
                        { name: "Settings", onClick: handleNavigation },
                        { name: "Logout", onClick: logout },
                      ]}
                    />
                  )}
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
