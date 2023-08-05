import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Course } from '@/features/skedrool/types';

export interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [],
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    removeCourse: (state, action: PayloadAction<Course>) => {
      state.courses = state.courses.filter(
        (course) => course.name !== action.payload.name
      );
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
});

export const { addCourse, removeCourse, setCourses } = coursesSlice.actions;

export default coursesSlice.reducer;
