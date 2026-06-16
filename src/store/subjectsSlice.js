import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      name: "Mathematics",
      code: "MTH101",
      teacher: "Mr. Ade",
    },
    {
      name: "English",
      code: "ENG102",
      teacher: "Mrs. Bello",
    },
    {
      name: "Physics",
      code: "PHY103",
      teacher: "Mr. James",
    },
  ],
};

const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    addSubject(state, action) {
      state.items.unshift(action.payload);
    },
    updateSubject(state, action) {
      const { originalCode, subject } = action.payload;
      const subjectIndex = state.items.findIndex(
        (item) => item.code === originalCode,
      );

      if (subjectIndex !== -1) {
        state.items[subjectIndex] = subject;
      }
    },
    deleteSubject(state, action) {
      state.items = state.items.filter(
        (subject) => subject.code !== action.payload,
      );
    },
  },
});

export const { addSubject, updateSubject, deleteSubject } =
  subjectsSlice.actions;

export default subjectsSlice.reducer;
