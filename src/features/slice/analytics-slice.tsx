import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DailyStudyAnalytics = {
  study_date: string;
  total_flashcards_studied: number;
};

export type StudySession = {
  id: number;
  user_id: number;
  deck_id: number;
  flashcards_studied: number;
  duration_sec: number;
  start_time: string;
  end_time: string;
};

export type StudyAnalyticsState = {
  dailyStudyAnalytics: DailyStudyAnalytics[];
  studySessions: StudySession[];
};

const initialState: StudyAnalyticsState = {
  dailyStudyAnalytics: [],
  studySessions: [],
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
  },
});

export const { setDailyStudyAnalytics } = studyAnalyticsSlice.actions;

export default studyAnalyticsSlice.reducer;
