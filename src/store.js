import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./features/comment/commentSlice";

export const store = configureStore({
  reducer: {
    comment: commentReducer,
  },
});
