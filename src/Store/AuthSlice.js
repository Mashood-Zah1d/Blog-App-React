import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     userData : null,
     authstatus : false
}

const authservice = createSlice({
    name: "auth", 
    initialState,
    reducers: {
        login: (state,action)=> {
            state.userData = action.payload;
            state.authstatus = true;
        },
        logout : (state) => {
            state.userData = null;
            state.authstatus = false;
        }
    }
})

export const {login,logout} = authservice.actions;

export default authservice.reducer