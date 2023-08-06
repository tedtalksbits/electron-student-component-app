import { configureStore } from '@reduxjs/toolkit';
import appReducers from '@/features/slice';
export const store = configureStore({
  reducer: appReducers,
});

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
