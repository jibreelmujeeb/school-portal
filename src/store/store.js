import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentsSlice";
import teachersReducer from "./teachersSlice";

const store = configureStore({
  reducer: {
    students: studentsReducer,
    teachers: teachersReducer,
  },
});

export default store;
