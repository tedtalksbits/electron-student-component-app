export type Course = {
  id: number;
  name: string;
  code: string;
  days: number[];
  class_time: string;
  start_date: string;
  end_date: string;
  semester_id: number;
  type: 'Lecture' | 'Lab' | 'Recitation' | 'Online Course';
  location: string;
  professor: string;
  professor_email: string;
  credits: number;
  color: string;
  start_time: string;
  end_time: string;
  term_year: string;
  created_at: Date;
  updated_at: Date;
};