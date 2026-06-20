import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentsSlice";
import teachersReducer from "./teachersSlice";
import subjectsReducer from "./subjectsSlice";
import timetableReducer from "./timetableSlice";

const store = configureStore({
  reducer: {
    students: studentsReducer,
    teachers: teachersReducer,
    subjects: subjectsReducer,
    timetable: timetableReducer,
  },
});

export default store;
