import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      name: "John Doe",
      id: "STD-001",
      email: "john@example.com",
      class: "SS2",
      status: "Active",
    },
    {
      name: "Aisha Bello",
      id: "STD-002",
      email: "aisha@example.com",
      class: "JSS3",
      status: "Active",
    },
    {
      name: "Michael James",
      id: "STD-003",
      email: "michael@example.com",
      class: "SS1",
      status: "Inactive",
    },
  ],
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent(state, action) {
      state.items.unshift(action.payload);
    },
    updateStudent(state, action) {
      const { originalId, student } = action.payload;
      const studentIndex = state.items.findIndex(
        (item) => item.id === originalId,
      );

      if (studentIndex !== -1) {
        state.items[studentIndex] = student;
      }
    },
    deleteStudent(state, action) {
      state.items = state.items.filter(
        (student) => student.id !== action.payload,
      );
    },
  },
});

export const { addStudent, updateStudent, deleteStudent } =
  studentsSlice.actions;

export default studentsSlice.reducer;
