import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/skedrool/slices/courses-slice';
import tasksReducer from '../features/taskify/slice/task-slice';
import projectsReducer from '../features/taskify/slice/project-slice';
export const store = configureStore({
  reducer: {
    coursesData: coursesReducer,
    tasksData: tasksReducer,
    projectsData: projectsReducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
