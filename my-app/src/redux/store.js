import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./feature/auth";
import TourReducer from "./feature/tourSlice";
export default configureStore({
    reducer:{
        auth: AuthReducer,
        tour: TourReducer,
        
    },
});