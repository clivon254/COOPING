

import {createSlice} from "@reduxjs/toolkit"


const initialState = {

    currentUser:null,

    error:null,

    loading:false
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        signInStart:(state) => {

            state.loading = true,

            state.error = null

        },

        signInSuccess:(state,action) => {

            state.currentUser = action.payload

            state.loading = false

            state.error = null
        },

        signInFailure:(state,action) => {


            state.loading = false

            state.error = action.payload

        },

        updateUserStart:(state) => {

            state.loading = true

            state.error = null
        },

        updateUserSuccess:(state,action) => {

            state.currentUser = action.payload

            state.error = null

            state.loading = false

        },

        updateUserFailure:(state,action) => {

            state.loading = false

            state.error = action.payload

        },

        deleteUserSuccess:(state,action) => {

            state.currentUser = null
            
            state.error = null

            state.loading = false
        },

        deleteUserFailure:(state,action) => {

            state.error = action.palyload

            state.loading = false

        },

        signOutSuccess:(state,action) => {

            state.error = null 

            state.loading = false

            state.currentUser = null

        }
    }

})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserSuccess,
    deleteUserFailure,
    signOutSuccess
}  
  = userSlice.actions


export default userSlice.reducer