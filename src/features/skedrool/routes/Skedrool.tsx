import { useEffect, useState } from 'react';
import { SkedroolCalendar } from '../components/SkedroolCalendar';
import { getCurrentCourses } from '../api';
import { Course } from '../types';
import { getCurrentSemesterByDate } from '@/lib/utils';

export const Skedrool = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const { year: currentYear, term } = getCurrentSemesterByDate(new Date());
    getCurrentCourses(currentYear, term, setCourses);
  }, []);
  return (
    <>
      <SkedroolCalendar courses={courses} />
    </>
  );
};
