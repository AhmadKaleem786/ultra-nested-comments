import { createSlice } from "@reduxjs/toolkit";
import { commentData } from "../../Data/commentData";

const initialState = {
  commentRecord: commentData,
};

const CommentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    handleComment: (state, { payload }) => {
      state.commentRecord.push(payload);
    },
    handleDelete: (state, { payload }) => {
      state.commentRecord = state.commentRecord.filter((data) => {
        return data.id !== payload.id;
      });


          deleteAllChild(payload.id);


      function deleteAllChild(payl) {
        const newId = state.commentRecord.filter((data) => {
          return data.parentId === payl;
        });
        
        if (newId.length === 0) {
          return;
        }
        state.commentRecord = state.commentRecord.filter((data) => {
          return data.parentId !== payl;
        });
        if (newId[0].child) {
          deleteAllChild(newId[0].id);
        }
      }
    },
    handleReply: (state, { payload }) => {
      state.commentRecord.push(payload);
      state.commentRecord = state.commentRecord.map((data) => {
        return {
          text: data.text,
          id: data.id,
          parentId: data.parentId,
          child: payload.parentId === data.id ? true : data.child,
        };
      });
    },
  },
});

export const { handleComment, handleDelete, handleReply } =
  CommentSlice.actions;
export default CommentSlice.reducer;
