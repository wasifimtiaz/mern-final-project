import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "../api"
export const login = createAsyncThunk("auth/login",async({formValue , navigate , toast},{rejectWithValue})=>
{
    try{
 const  responce = await api.Signin(formValue);
 toast.success("Login Successfully");
 navigate("/");
 return responce.data;
    }
    catch(err){
 return rejectWithValue(err.responce.data)
    }
});

export const register = createAsyncThunk("auth/register",async({formValue , navigate , toast},{rejectWithValue})=>
{
    try{
 const  responce = await api.Signup(formValue);
 toast.success("SignUp Successfully");
 navigate("/");
 return responce.data;
    }
    catch(err){
 return rejectWithValue(err.responce.data)
    }
});

const auth = createSlice({
    name: "auth",
    initialState:{
        user:null,
        error: "",
        loading: false,
    },

    reducers: {
        setuser: (state, action) => {
          state.user = action.payload;
        },
        setlogout: (state, action) => {
            localStorage.clear();
            state.user = null;
          },
    },
    extraReducers:{
        [login.pending]: (state, action)=>{
            state.loading = true;     
               },
        [login.fulfilled]: (state, action)=>{
                state.loading = false; 
                localStorage.setItem("profile", JSON.stringify({...action.payload}));
               state.user = action.payload;
               },
        [login.rejected]:(state, action)=>{
                state.loading =false;
                state.error = action.payload;
                toast('Incorrect email or password');
               },
        [register.pending]: (state, action)=>{
                state.loading = true;     
                   },
        [register.fulfilled]: (state, action)=>{
                    state.loading = false; 
                    localStorage.setItem("profile", JSON.stringify({...action.payload}));
                   state.user = action.payload;
                   },
        [register.rejected]:(state, action)=>{
                    state.loading =false;
                    state.error = action.payload;
                    toast('User Already Exist');
                   },
            },
    
}); 
export const { setuser , setlogout } = auth.actions;
export default auth.reducer;
