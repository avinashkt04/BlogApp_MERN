import { createSlice } from "@reduxjs/toolkit";
import { createPostAPI, deletePostAPI, editPostAPI, getAllPostAPI, getPostAPI } from "../services/postAction";

const initialState = {
    allPost: [],
    postInfo: {},
    loading: false,
    message: null,
    success: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        resetPostState: (state) => {
            state.success = null
            state.message = null
            state.postInfo = {}
        }
    },
    extraReducers: (builder) => {
        builder
            // create-post
            .addCase(createPostAPI.pending, (state, action) => {
                state.loading=true
                state.success=null
                state.message=null
            })
            .addCase(createPostAPI.fulfilled, (state, action) => {
                state.loading=false
                state.postInfo=action.payload.data
                state.message=action.payload.message
                state.success=action.payload.success
            })
            .addCase(createPostAPI.rejected, (state, action) => {
                state.loading=false
                state.success=false
                action.error.message = "Internal server error"
                state.message = action.error.message
            })
            // get-post
            .addCase(getPostAPI.pending, (state, action) => {
                state.loading=true
            })
            .addCase(getPostAPI.fulfilled, (state, action) => {
                state.loading=false
                state.postInfo=action.payload.data
            })
            .addCase(getPostAPI.rejected, (state, action) => {
                state.loading=false
            })
            // get-all-post
            .addCase(getAllPostAPI.pending, (state, action) => {
                state.loading=true
            })
            .addCase(getAllPostAPI.fulfilled, (state, action) => {
                state.loading=false
                state.allPost=action.payload.data
            })
            .addCase(getAllPostAPI.rejected, (state, action) => {
                state.loading=false
            })
            // edit-post
            .addCase(editPostAPI.pending, (state, action) => {
                state.loading=true
                state.success=null
                state.message=null
            })
            .addCase(editPostAPI.fulfilled, (state, action) => {
                state.loading=false
                state.postInfo=action.payload.data
                state.message=action.payload.message
                state.success=action.payload.success
            })
            .addCase(editPostAPI.rejected, (state, action) => {
                state.loading=false
                state.success=false
                action.error.message = "Internal server error"
                state.message = action.error.message
            })
            // delete-post
            .addCase(deletePostAPI.pending, (state, action) => {
                state.loading=true
                state.success=null
                state.message=null
            })
            .addCase(deletePostAPI.fulfilled, (state, action) => {
                state.loading=false
                state.postInfo=action.payload.data
                state.message=action.payload.message
                state.success=action.payload.success
            })
            .addCase(deletePostAPI.rejected, (state, action) => {
                state.loading=false
                state.success=false
                action.error.message = "Internal server error"
                state.message = action.error.message
            })
    }
})

export const {resetPostState} = postSlice.actions

export default postSlice.reducer;