// Import necessary modules
import React, { useEffect } from "react";
import "./App.css";
import { AuthLayout, Container, Footer, Header } from "./components";
import {  Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUserAPI } from "./store/services/userAction";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CreatePost from "./pages/CreatePost";
import Settings from "./pages/Settings";
import AllPosts from "./pages/AllPosts";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserAPI());
  }, []);

  return (
    <div className="min-h-screen">
      <Container>
        <Header />
        <main className="bg-[#232944]">
          {/* Define your routes using Routes and Route components */}
          <Routes>
            <Route path="/" element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
            <Route
              path="/:username/profile"
              element={<AuthLayout authentication={true}><Profile /></AuthLayout>}
            />
            <Route
              path="/:username/profile/edit"
              element={<AuthLayout authentication={true}><EditProfile /></AuthLayout>}
            />
            <Route
              path="/:username/create-post"
              element={<AuthLayout authentication={true}><CreatePost /></AuthLayout>}
            />
            <Route
              path="/:username/settings"
              element={<AuthLayout authentication={true}><Settings /></AuthLayout>}
            />
            <Route
              path="/:username/all-posts"
              element={<AuthLayout authentication={true}><AllPosts /></AuthLayout>}
            />
            <Route
              path="/:username/:slug"
              element={<AuthLayout authentication={true}><Post /></AuthLayout>}
            />
            <Route
              path="/:username/:slug/edit"
              element={<AuthLayout authentication={true}><EditPost /></AuthLayout>}
            />
          </Routes>
        </main>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
