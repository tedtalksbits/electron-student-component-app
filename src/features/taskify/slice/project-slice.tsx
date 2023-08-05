import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Project = {
  id: number;
  user_id: number;
  name: string;
  icon: string;
  created_at: Date;
  updated_at: Date;
};

export interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<Project>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload.id
      );
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      state.projects = state.projects.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
  },
});

export const { addProject, removeProject, updateProject, setProjects } =
  projectSlice.actions;

export default projectSlice.reducer;
