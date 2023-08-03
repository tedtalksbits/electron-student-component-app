import { Course } from '../types';
type ResponseData<T> = {
  data: T;
  error?: string;
};
export function getCurrentCourses(
  year: number,
  term: string,
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
  refetchQuery?: string
) {
  window.electron.ipcRenderer.sendMessage('get-current-courses', year, term);
  window.electron.ipcRenderer.once('get-current-courses-response', (args) => {
    const response = args as ResponseData<Course[]>;
    if (response.error) {
      alert(response.error);
      return;
    }
    setCourses(response.data);
  });
}
