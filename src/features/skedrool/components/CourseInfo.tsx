import { Course } from '../types';
import { getDayNameByDayIndex } from '@/lib/utils';
import {
  Calendar,
  Clock,
  Mail,
  Paperclip,
  Pin,
  Text,
  User,
} from 'lucide-react';
import { Divider } from '@tremor/react';

export const CourseInfo = ({ course }: { course?: Course }) => {
  return (
    <div className='flex flex-col gap-3'>
      {course?.code}
      <table>
        <tbody>
          <tr>
            <td className='pr-2 flex text-muted-foreground items-center gap-1'>
              <Text height={15} width={15} /> Name:
            </td>
            <td className='text-foreground font-medium'>{course?.name}</td>
          </tr>
          <tr>
            <td className='pr-2 flex text-muted-foreground items-center gap-1'>
              <Paperclip height={15} width={15} /> Type:
            </td>
            <td className='text-foreground font-medium'>{course?.type}</td>
          </tr>
          <tr>
            <td className='pr-2 flex text-muted-foreground items-center gap-1'>
              <Pin height={15} width={15} /> Location:
            </td>
            <td className='text-foreground font-medium'>{course?.location}</td>
          </tr>
          <tr>
            <td className='pr-2 flex text-muted-foreground items-center gap-1'>
              <Calendar size={15} /> Days:
            </td>
            <td className='text-foreground font-medium'>
              {sayMeetDaysForCourse(course)}
            </td>
          </tr>
          <tr>
            <td className='pr-2 flex text-muted-foreground items-center gap-1'>
              <Clock size={15} /> Time:
            </td>
            <td className='text-foreground font-medium'>
              {course?.class_time}
            </td>
          </tr>
          <tr>
            <td className='pr-2 flex text-muted-foreground items-center gap-1'>
              <User size={15} /> Instructor:
            </td>
            <td className='text-foreground font-medium'>{course?.professor}</td>
          </tr>
          <tr>
            <td className='pr-2 flex text-muted-foreground items-center gap-1'>
              <Mail size={15} /> Email:
            </td>
            <td className='text-foreground font-medium'>
              <a
                href={`${course?.professor_email}`}
                className='flex items-center gap-1 underline text-primary'
              >
                Email
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <Divider />
    </div>
  );
};

function sayMeetDaysForCourse(course?: Course) {
  if (!course) return '';
  const days = course.days.map((day) => getDayNameByDayIndex(day)).join(', ');
  return days;
}

// function convertString24HourTimeTo12HourTime(time?: string) {
//   if (!time) return '';
//   // time forma is '1200' or '1230'
//   const hour = time.slice(0, 2);
//   const minute = time.slice(2, 4);
//   const hourInt = parseInt(hour);
//   const minuteInt = parseInt(minute);
//   const isPM = hourInt >= 12;
//   const hour12 = hourInt > 12 ? hourInt - 12 : hourInt;
//   const hour12String = hour12.toString().length === 1 ? '0' + hour12 : hour12;
//   const minuteString = minuteInt.toString() === '0' ? '00' : minuteInt;
//   const ampm = isPM ? 'PM' : 'AM';
//   return `${hour12String}:${minuteString} ${ampm}`;
// }
