import { useState } from 'react';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Course } from '../types';
import { CourseInfo } from './CourseInfo';

type CalendarItemsProps = {
  courses: Course[];
};

export const SkedroolCalendar = ({ courses }: CalendarItemsProps) => {
  const [selectedCourse, setSelectedCourse] = useState<Course>();
  const [open, setOpen] = useState(false);
  const closeDrawer = () => {
    setOpen(false);
  };
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

    const onDataSelect = (data: Course) => {
      setSelectedCourse(data);
      setOpen(true);
    };

    return (
      <ul className='space-y-2'>
        {listData.map((course) => (
          <li
            key={course.name}
            onClick={() => onDataSelect(course)}
            className='hover:bg-primary-foreground p-1 rounded-full transition-all duration-300 origin-left'
            title={
              value.toDate() +
              ' ' +
              course.name +
              '@' +
              course.start_time +
              ' ' +
              course.location
            }
          >
            <Badge
              color={course.color}
              text={course.name + '@' + course.start_time}
            />
          </li>
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
      <Sheet open={open} onOpenChange={closeDrawer}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedCourse?.name}</SheetTitle>
            <SheetDescription asChild>
              <CourseInfo course={selectedCourse} />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
