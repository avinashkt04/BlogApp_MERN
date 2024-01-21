import {createSlice} from '@reduxjs/toolkit'
import { getUserProfileAPI } from '../services/profileAction';

const initialState = {
    profileInfo: {},
    loading: false,
    message: null,
    success: null
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    reducers: {
        resetProfileState: (state) => {
            state.message=null
            state.success=null
            state.profileInfo={}
        }
    },
    extraReducers: (builder) => {
        builder
            //getUserProfileAPI
            .addCase(getUserProfileAPI.pending, (state, action) => {
                state.loading=true
                state.success=null
                state.message=null
            })
            .addCase(getUserProfileAPI.fulfilled, (state, action) => {
                state.loading=false
                state.success=action.payload.success
                state.message=action.payload.message
                state.profileInfo = action.payload.data
            })
            .addCase(getUserProfileAPI.rejected, (state, action) => {
                state.loading=false
                state.success=false
                action.error.message = "Internal server error"
                state.message = action.error.message
            })
            
    }
})

export const { resetProfileState } = profileSlice.actions

export default profileSlice.reducer;