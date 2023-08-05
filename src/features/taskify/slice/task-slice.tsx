import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Task = {
  id: number;
  project_id: number;
  user_id: number;
  name: string;
  description: string;
  status: 'not started' | 'in progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  icon: string;
  due: Date;
  created_at: Date;
  updated_at: Date;
};

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    getDoneTasks: (state) => {
      state.tasks = state.tasks.filter((task) => task.status === 'done');
    },
    getTodoTasks: (state) => {
      state.tasks = state.tasks.filter((task) => task.status === 'not started');
    },

    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTask,
  getDoneTasks,
  getTodoTasks,
  setTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
