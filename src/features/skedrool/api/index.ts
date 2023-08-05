import { Course } from '../types';
type ResponseData<T> = {
  data: T;
  error?: string;
};
export function getCurrentCourses(
  year: number,
  term: string,
  cb: (courses: Course[]) => void
) {
  window.electron.ipcRenderer.sendMessage('get-current-courses', year, term);
  window.electron.ipcRenderer.once('get-current-courses-response', (args) => {
    const response = args as ResponseData<Course[]>;
    if (response.error) {
      alert(response.error);
      return;
    }
    const dataWithDatesAsString = response.data.map((course) => {
      return {
        ...course,
        created_at: course.created_at.toString() as any,
        updated_at: course.updated_at.toString() as any,
      };
    });
    cb(dataWithDatesAsString);
  });
}
