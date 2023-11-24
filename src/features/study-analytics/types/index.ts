import { DeckTypeDTO } from '@/features/decks/types';

export type DailyStudyAnalytics = {
  study_date: string;
  total_flashcards_studied: number;
  total_duration_sec: number;
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
  totalXp: {
    total_xp: number;
  };
};
