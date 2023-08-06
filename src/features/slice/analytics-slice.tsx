import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeckTypeDTO } from '../decks/types';

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

export type MostStudiedDeck = {
  created_at: string;
  deck_id: number;
  description: string;
  id: number;
  image: string | null;
  name: string;
  tags: string;
  total_duration: string;
  total_flashcards_studied: string;
  updated_at: string;
  user_id: number;
  visibility: string | null;
};

export type TotalStudyAnalytics = {
  total_flashcards_studied: number;
  total_completed_sessions: number;
  total_time_studied: number;
  average_study_duration: number;
};

export type LastStudySession = DeckTypeDTO & {
  flashcards_studied: number;
  duration_sec: number;
  start_time: string;
  end_time: string;
  study_session_id: number | null;
};

export type StudyAnalyticsState = {
  dailyStudyAnalytics: DailyStudyAnalytics[];
  studySessions: StudySession[];
  mostStudiedDecks: MostStudiedDeck[];
  totalStudyAnalytics: TotalStudyAnalytics;
  lastStudySession: LastStudySession;
};

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
