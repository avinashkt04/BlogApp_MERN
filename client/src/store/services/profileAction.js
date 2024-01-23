import { createAsyncThunk } from "@reduxjs/toolkit";

const getUserProfileAPI = createAsyncThunk('profile', async(username, {rejectWithValue}) => {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/profile/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"
        })
        const json = await response.json()
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export { getUserProfileAPI }