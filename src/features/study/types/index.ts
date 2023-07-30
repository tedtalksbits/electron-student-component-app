export type StudySession = {
  id: number;
  user_id: number;
  deck_id: number;
  start_time: Date;
  end_time: Date;
  duration_sec: number;
  flashcards_studied: number;
};

export type StartStudySession = {
  user_id: number;
  deck_id: number;
  start_time: Date;
};

export type EndStudySession = {
  user_id: number;
  deck_id: number;
  end_time: Date;
  duration_sec: number;
  flashcards_studied: number;
};
