import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "TCH-001",
      name: "Mr. Ade",
      email: "ade@example.com",
      class: "SS2",
      status: "Active",
    },
    {
      id: "TCH-002",
      name: "Mrs. Bello",
      email: "bello@example.com",
      class: "JSS3",
      status: "Active",
    },
    {
      id: "TCH-003",
      name: "Mr. James",
      email: "james@example.com",
      class: "SS1",
      status: "Inactive",
    },
  ],
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    addTeacher(state, action) {
      state.items.unshift(action.payload);
    },
    updateTeacher(state, action) {
      const { originalId, teacher } = action.payload;
      const teacherIndex = state.items.findIndex(
        (item) => item.id === originalId,
      );

      if (teacherIndex !== -1) {
        state.items[teacherIndex] = teacher;
      }
    },
    deleteTeacher(state, action) {
      state.items = state.items.filter(
        (teacher) => teacher.id !== action.payload,
      );
    },
  },
});

export const { addTeacher, updateTeacher, deleteTeacher } =
  teachersSlice.actions;

export default teachersSlice.reducer;
