import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DailyStudyAnalytics,
  LastStudySession,
  MostStudiedDeck,
  StudyAnalyticsState,
  TotalStudyAnalytics,
} from '../study-analytics/types';

const initialState: StudyAnalyticsState = {
  dailyStudyAnalytics: [],
  studySessions: [],
  mostStudiedDecks: [],
  totalStudyAnalytics: {
    total_flashcards_studied: 0,
    total_completed_sessions: 0,
    total_time_studied: 0,
    average_study_duration: 0,
  },
  lastStudySession: {
    study_session_id: null,
    id: null,
    user_id: null,
    name: '',
    description: '',
    image: '',
    tags: '',
    visibility: '',
    created_at: '',
    updated_at: '',
    flashcards_studied: 0,
    duration_sec: 0,
    start_time: '',
    end_time: '',
  },
};

const studyAnalyticsSlice = createSlice({
  name: 'studyAnalytics',
  initialState,
  reducers: {
    setDailyStudyAnalytics(
      state,
      action: PayloadAction<DailyStudyAnalytics[]>
    ) {
      state.dailyStudyAnalytics = action.payload;
    },
    setMostStudiedDecks(state, action: PayloadAction<MostStudiedDeck[]>) {
      state.mostStudiedDecks = action.payload;
    },
    setTotalStudyAnalytics(state, action: PayloadAction<TotalStudyAnalytics>) {
      state.totalStudyAnalytics = action.payload;
    },
    setLastStudySession(state, action: PayloadAction<LastStudySession>) {
      state.lastStudySession = action.payload;
    },
  },
});

export const {
  setDailyStudyAnalytics,
  setMostStudiedDecks,
  setTotalStudyAnalytics,
  setLastStudySession,
} = studyAnalyticsSlice.actions;

export default studyAnalyticsSlice.reducer;
