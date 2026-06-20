import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "SCH-001",
      subject: "Mathematics",
      teacher: "Mr. Johnson",
      class: "SS2",
      day: "Monday",
      startTime: "08:00",
      endTime: "09:00",
    },
    {
      id: "SCH-002",
      subject: "Physics",
      teacher: "Mrs. Grace",
      class: "SS3",
      day: "Tuesday",
      startTime: "09:00",
      endTime: "10:00",
    },
    {
      id: "SCH-003",
      subject: "English",
      teacher: "Mr. Daniel",
      class: "JSS3",
      day: "Wednesday",
      startTime: "10:00",
      endTime: "11:00",
    },
  ],
};

const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    addTimetableItem(state, action) {
      state.items.unshift(action.payload);
    },
    updateTimetableItem(state, action) {
      const { originalId, item } = action.payload;
      const itemIndex = state.items.findIndex(
        (schedule) => schedule.id === originalId,
      );

      if (itemIndex !== -1) {
        state.items[itemIndex] = item;
      }
    },
    deleteTimetableItem(state, action) {
      state.items = state.items.filter(
        (schedule) => schedule.id !== action.payload,
      );
    },
  },
});

export const { addTimetableItem, updateTimetableItem, deleteTimetableItem } =
  timetableSlice.actions;

export default timetableSlice.reducer;
