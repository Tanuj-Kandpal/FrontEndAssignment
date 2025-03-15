import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [], //
    postDetails: null,
  },
  reducers: {
    setPost: (state, action) => {
      state.posts = action.payload;
    },
    getPost: (state, action) => {
      state.postDetails = action.payload;
    },
  },
});

export const { setPost, getPost } = postSlice.actions;
export default postSlice.reducer;
