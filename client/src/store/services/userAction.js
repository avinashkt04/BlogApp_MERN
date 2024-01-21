import { createAsyncThunk } from "@reduxjs/toolkit";

const signupAPI = createAsyncThunk('auth/signup', async(data, {rejectWithValue}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({fullname: data.fullname, username: data.username, password: data.password})
        })
        const json = await response.json()
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const loginAPI = createAsyncThunk('auth/login', async(data, {rejectWithValue}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({username: data.username, password: data.password})
        })
        const json = await response.json()
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const getCurrentUserAPI = createAsyncThunk('auth/getcurrentuser', async(_, {rejectWithValue}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/current-user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const json = response.json();
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const logoutAPI = createAsyncThunk('auth/logout', async(_, {rejectWithValue}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const json = await response.json()
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const updateAvatarAPI = createAsyncThunk('profile/updateAvatar', async (avatarFile, {rejectWithValue}) => {
    // const avatarFile = avatarFileList[0];
    try {
        // const authToken = document.cookie.token
        const formData = new FormData()
        formData.append('avatar', avatarFile)
        console.log(formData)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/update-avatar`, {
            method: "PATCH",
            // headers: {
            //     // "Content-Type": "application/json"
            //     // "Authorization": `${authToken}`
            //     "Content-Type": "multipart/form-data"
            // },
            credentials: "include",
            body: formData
        })
        const json = await response.json()
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const removeAvatarAPI = createAsyncThunk('profile/removeAvatar', async (_, {rejectWithValue}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/remove-avatar`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const json = await response.json()
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const updateAccountAPI = createAsyncThunk('profile/updateAccount', async(data, {rejectWithValue}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/update-account`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({fullname: data.fullname, username: data.username, bio: data.bio, addLinks: data.links})
        })
        const json = response.json()
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const changePasswordAPI = createAsyncThunk('profile/changePassword', async(data, {rejectWithValue}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({oldPassword: data.password, newPassword: data.newPassword})
        })
        const json = response.json()
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export { signupAPI, loginAPI, logoutAPI, getCurrentUserAPI, updateAvatarAPI, removeAvatarAPI, updateAccountAPI, changePasswordAPI }