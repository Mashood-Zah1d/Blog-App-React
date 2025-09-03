import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Posts: []
}

const postService = createSlice({
  name: "post",
  initialState,
  reducers: {
    Posts: (state, action) => {
      state.Posts = action.payload;
    },

    deletePost: (state,action) => {
      const slug = action.payload;
      if (slug) {
        state.Posts = state.Posts.filter((post)=> post.$id !== slug) 
      }
    },

    addPost: (state, action) => {
      state.Posts.push(action.payload);
    },

    editPost: (state, action) => {
      const slug = action.payload.slug;
      const updatedData = action.payload.updatedData;
      state.Posts= state.Posts.map((post) => post.$id === slug ? { ...post, ...updatedData } : post)
    }
  }
})

export const { Posts, deletePost,editPost,addPost } = postService.actions;

export default postService.reducer;