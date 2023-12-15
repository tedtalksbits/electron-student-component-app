// id, name, email, username, password, avatar, nickname, status, last_login, failed_login_attempts, created_at, upated_at, preference_id, role, total_xp, level

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  nickname: string;
  status: string;
  last_login: string;
  failed_login_attempts: number;
  created_at: string;
  updated_at: string;
  preference_id: string;
  role: string;
  total_xp: number | string;
  level: number | string;
};

export interface UserLevel extends Level {
  total_xp: number;
}

export interface Level {
  level: number;
  current_level_xp: number;
  next_level_xp: number;
}
