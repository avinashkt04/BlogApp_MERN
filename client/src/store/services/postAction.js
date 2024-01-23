import { createAsyncThunk } from "@reduxjs/toolkit";

const createPostAPI = createAsyncThunk('post/create', async(data, {rejectWithValue}) => {
    try {
        const token = localStorage.getItem("token")
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("featuredImage", data.featuredImage[0])
        formData.append("content", data.content)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs/create-blog`, {
            method: "POST",
            headers:{
                "Authorization": `Bearer ${token}`
            },
            credentials: "include",
            body: formData
        })
        const json = await response.json()
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const getPostAPI = createAsyncThunk('post/getPost', async(slug, {rejectWithValue}) => {
    try {
        const token = localStorage.getItem("token")
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs/${slug}`, {
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

const getAllPostAPI = createAsyncThunk('post/getAllPost', async (_, {rejectWithValue}) => {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs/all-blogs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch all posts: ${response.statusText}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const editPostAPI = createAsyncThunk('post/edit', async({slug, data}, {rejectWithValue}) => {
    try {
        const token = localStorage.getItem("token")
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("featuredImage", data.featuredImage[0])
        formData.append("status", data.status)
        formData.append("content", data.content)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs/edit-blog/${slug}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            credentials: "include",
            body: formData
        })
        const json = await response.json()
        return json
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const deletePostAPI = createAsyncThunk('post/delet', async(slug, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs/delete-blog/${slug}`, {
            method: "DELETE",
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


export { createPostAPI, getPostAPI, getAllPostAPI, editPostAPI, deletePostAPI }