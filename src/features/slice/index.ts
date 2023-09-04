import analyticsReduces from './analytics-slice';
import coursesReducer from './courses-slice';
import studyAnalyticsReducer from './analytics-slice';
import { combineReducers } from '@reduxjs/toolkit';
// import authReducer from './auth-slice';
// import flashcardReducer from './flashcard-slice';
// import userReducer from './user-slice';

const rootReducer = combineReducers({
  // auth: authReducer,
  // flashcard: flashcardReducer,
  // user: userReducer,
  analytics: analyticsReduces,
  courses: coursesReducer,
  studyAnalytics: studyAnalyticsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
