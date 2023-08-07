import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Course } from '../types';
import { CourseInfo } from './CourseInfo';

type CalendarItemsProps = {
  courses: Course[];
};

export const SkedroolCalendar = ({ courses }: CalendarItemsProps) => {
  const renderValue = (value: Dayjs) => {
    const listData = courses
      .filter((course) => {
        const start = course.start_date;
        const end = course.end_date;
        const date = value.format('MM/DD/YYYY');
        if (course.days.length === 0) return false;
        for (let i = 0; i < course.days.length; i++) {
          if (value.day() === course.days[i]) {
            return date >= start && date <= end;
          }
        }
      })
      .sort((a, b) => {
        return a.start_time.localeCompare(b.start_time);
      });

    return (
      <ul className='space-y-2'>
        {listData.map((course) => (
          <>
            <Sheet key={course.id}>
              <SheetTrigger asChild>
                <Badge
                  title='Click to view course details'
                  color={course.color}
                  text={course.code + '\n@' + course.class_time}
                />
              </SheetTrigger>
              <SheetContent className='min-w-[600px]'>
                <SheetHeader>
                  <SheetTitle>{course?.name}</SheetTitle>
                </SheetHeader>
                <CourseInfo course={course} />
              </SheetContent>
            </Sheet>
          </>
        ))}
      </ul>
    );
  };
  return (
    <>
      <Calendar
        onChange={(value) => console.log(value)}
        cellRender={renderValue}
        fullscreen={true}
      />
    </>
  );
};
