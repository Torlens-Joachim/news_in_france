import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const bookmarkSlice = createSlice({
    name: "bookmarks",

    initialState,
    reducers: {
        addBookmark: (state, action) => {
            const alreadyExists = state.value.some(e => e.link === action.payload.link);
            if(!alreadyExists) {
                state.value.push(action.payload);
            }
          },
        removeBookmark: (state, action) => {
            const isExists = state.value.some(e => e.link === action.payload.link);
            if(isExists) {
                state.value = state.value.filter(e => e.link !== action.payload.link);
            }
        },
        removeAllBookmarks: (state) => {
            state.value = [];
        }
    }
});

export const { addBookmark, removeBookmark, removeAllBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;