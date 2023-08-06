import { useEffect } from 'react';
import { SkedroolCalendar } from '../components/SkedroolCalendar';
import { getCurrentCourses } from '../api';
import { getCurrentSemesterByDate } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCourses } from '@/features/slice/courses-slice';

export const Skedrool = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { year: currentYear, term } = getCurrentSemesterByDate(new Date());
    getCurrentCourses(currentYear, term, (data) => dispatch(setCourses(data)));
  }, [dispatch]);

  const courses = useAppSelector((state) => state.courses.courses);
  return (
    <>
      <SkedroolCalendar courses={courses} />
    </>
  );
};
