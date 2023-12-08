import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authStatus: false,
        user: null
    },
    reducers: {
        addAuth: (state, action) => {
            state.authStatus = action.payload
        },

        addUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {addAuth, addUser} = authSlice.actions
export default authSlice.reducer 