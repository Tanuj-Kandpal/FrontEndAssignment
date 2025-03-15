import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../Store/postSlice";

const store = configureStore({
  reducer: {
    post: postSlice,
  },
});

export default store;
