import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./index";
import { getAllPostAPI } from "../store/services/postAction";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.user.status);
  const username = useSelector((state) => state.user.userInfo?.username);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/");
    } else if (!authentication && authStatus) {
      navigate(`/${username}/all-posts`);
      dispatch(getAllPostAPI());
    }
    setLoader(false);
  }, [navigate, authentication, authStatus, username]);

  return loader ? <Spinner className="w-9" /> : <>{children}</>;
}

export default AuthLayout;
