import { USER_ID } from '@/constants';
import { Task } from '@/features/slice/task-slice';
import { Project } from '@/features/slice/project-slice';

type ResponseData<T> = {
  error?: string;
  data: T;
};

export function getTasks(cb: (data: Task[]) => void) {
  window.electron.ipcRenderer.sendMessage('get-tasks', USER_ID);
  window.electron.ipcRenderer.once('get-tasks-response', (args) => {
    const response = args as ResponseData<Task[]>;
    if (response.error) {
      alert(response.error);
      return;
    }
    const dataWithDatesAsString = response.data.map((task) => {
      return {
        ...task,
        created_at: task.created_at.toString() as any,
        updated_at: task.updated_at.toString() as any,
        due: task?.due?.toString() as any,
      };
    });
    cb(dataWithDatesAsString);
  });
}

export function updateTask(
  id: number,
  task: Partial<Task>,
  cb: (data: Task[]) => void,
  refetchQuery: string
) {
  window.electron.ipcRenderer.sendMessage(
    'update-task',
    id,
    task,
    refetchQuery
  );
  window.electron.ipcRenderer.once('update-task-response', (args) => {
    const response = args as ResponseData<Task[]>;
    if (response.error) {
      alert(response.error);
      return;
    }
    const dataWithDatesAsString = response.data.map((task) => {
      return {
        ...task,
        created_at: task.created_at.toString() as any,
        updated_at: task.updated_at.toString() as any,
        due: task?.due?.toString() as any,
      };
    });
    cb(dataWithDatesAsString);
  });
}

export function createTask(task: Partial<Task>, cb: (data: Task[]) => void) {
  const refetchQuery = `SELECT * FROM project_tasks WHERE user_id = ${USER_ID} AND project_id = ${task.project_id}`;
  window.electron.ipcRenderer.sendMessage('create-task', task, refetchQuery);
  window.electron.ipcRenderer.once('create-task-response', (args) => {
    const response = args as ResponseData<Task[]>;
    if (response.error) {
      alert(response.error);
      return;
    }
    const dataWithDatesAsString = response.data.map((task) => {
      return {
        ...task,
        created_at: task.created_at.toString() as any,
        updated_at: task.updated_at.toString() as any,
        due: task?.due?.toString() as any,
      };
    });
    cb(dataWithDatesAsString);
  });
}

export function deleteTask(
  id: number,
  cb: (data: Task[]) => void,
  refetchQuery: string
) {
  window.electron.ipcRenderer.sendMessage('delete-task', id, refetchQuery);
  window.electron.ipcRenderer.once('delete-task-response', (args) => {
    const response = args as ResponseData<Task[]>;
    if (response.error) {
      alert(response.error);
      return;
    }
    const dataWithDatesAsString = response.data.map((task) => {
      return {
        ...task,
        created_at: task.created_at.toString() as any,
        updated_at: task.updated_at.toString() as any,
        due: task?.due?.toString() as any,
      };
    });
    cb(dataWithDatesAsString);
  });
}

export function getTasksByProjectId(
  projectId: number,
  cb: (data: Task[]) => void
) {
  window.electron.ipcRenderer.sendMessage(
    'get-tasks-by-projectId',
    projectId,
    USER_ID
  );
  window.electron.ipcRenderer.once(
    'get-tasks-by-projectId-response',
    (args) => {
      const response = args as ResponseData<Task[]>;
      if (response.error) {
        alert(response.error);
        return;
      }
      const dataWithDatesAsString = response.data.map((task) => {
        return {
          ...task,
          created_at: task.created_at.toString() as any,
          updated_at: task.updated_at.toString() as any,
          due: task?.due?.toString() as any,
        };
      });
      cb(dataWithDatesAsString);
    }
  );
}

export function createProject(
  project: Partial<Project>,
  cb: (data: Project[]) => void
) {
  const refetchQuery = `SELECT * FROM projects WHERE user_id = ${USER_ID}`;
  window.electron.ipcRenderer.sendMessage(
    'create-project',
    project,
    refetchQuery
  );
  window.electron.ipcRenderer.once('create-project-response', (args) => {
    const response = args as ResponseData<Project[]>;
    if (response.error) {
      alert(response.error);
      return;
    }
    const dataWithDatesAsString = response.data.map((project) => {
      return {
        ...project,
        created_at: project.created_at.toString() as any,
        updated_at: project.updated_at.toString() as any,
      };
    });
    cb(dataWithDatesAsString);
  });
}

export function getProjects(cb: (data: Project[]) => void) {
  window.electron.ipcRenderer.sendMessage('get-projects', USER_ID);
  window.electron.ipcRenderer.once('get-projects-response', (args) => {
    const response = args as ResponseData<Project[]>;
    if (response.error) {
      alert(response.error);
      return;
    }
    const dataWithDatesAsString = response.data.map((project) => {
      return {
        ...project,
        created_at: project.created_at.toString() as any,
        updated_at: project.updated_at.toString() as any,
      };
    });
    cb(dataWithDatesAsString);
  });
}

export function updateProject(
  id: number,
  project: Partial<Project>,
  cb: (data: Project[]) => void,
  refetchQuery: string
) {
  window.electron.ipcRenderer.sendMessage(
    'update-project',
    id,
    project,
    refetchQuery
  );
  window.electron.ipcRenderer.once('update-project-response', (args) => {
    const response = args as ResponseData<Project[]>;
    if (response.error) {
      alert(response.error);
      return;
    }
    const dataWithDatesAsString = response.data.map((project) => {
      return {
        ...project,
        created_at: project.created_at.toString() as any,
        updated_at: project.updated_at.toString() as any,
      };
    });
    cb(dataWithDatesAsString);
  });
}

export function deleteProject(
  id: number,
  cb: (data: Project[]) => void,
  refetchQuery: string
) {
  window.electron.ipcRenderer.sendMessage('delete-project', id, refetchQuery);
  window.electron.ipcRenderer.once('delete-project-response', (args) => {
    const response = args as ResponseData<Project[]>;
    if (response.error) {
      alert(response.error);
      return;
    }
    const dataWithDatesAsString = response.data.map((project) => {
      return {
        ...project,
        created_at: project.created_at.toString() as any,
        updated_at: project.updated_at.toString() as any,
      };
    });
    cb(dataWithDatesAsString);
  });
}
