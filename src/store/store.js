import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentsSlice";
import teachersReducer from "./teachersSlice";
import subjectsReducer from "./subjectsSlice";

const store = configureStore({
  reducer: {
    students: studentsReducer,
    teachers: teachersReducer,
    subjects: subjectsReducer,
  },
});

export default store;
