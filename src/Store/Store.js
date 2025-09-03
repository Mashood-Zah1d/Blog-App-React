import {configureStore} from '@reduxjs/toolkit'

import authservice from './AuthSlice'
import postService from './PostSlice'
const store = configureStore({
    reducer : {
        auth : authservice,
        post : postService
    }
});

export default store;

