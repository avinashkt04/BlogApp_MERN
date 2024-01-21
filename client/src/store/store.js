import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice"
import postSlice from "./features/postSlice";
import profileSlice from "./features/profileSlice";

const store = configureStore({
    reducer: {
        post: postSlice,
        user: userSlice,
        profile: profileSlice,
    },
})

export default store