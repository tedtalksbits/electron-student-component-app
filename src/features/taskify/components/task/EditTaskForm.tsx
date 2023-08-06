import React from 'react';
import { Task, setTasks } from '@/features/slice/task-slice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { updateTask } from '../../api';
import { useAppDispatch } from '@/hooks/redux';
import { useToast } from '@/components/ui/use-toast';
import { USER_ID } from '@/constants';

export const EditTaskForm = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const refetchQuery = `SELECT * FROM project_tasks WHERE project_id = ${task.project_id} AND user_id = ${USER_ID}`;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    updateTask(task.id, data, (data) => dispatch(setTasks(data)), refetchQuery);
    toast({
      title: 'Task updated',
      description: 'Task has been updated successfully',
      variant: 'default',
    });
  };
  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <Label htmlFor='name'>Name</Label>
        <Input type='text' name='name' id='name' defaultValue={task.name} />
      </div>
      <div className='form-group'>
        <Label htmlFor='icon'>Icon</Label>
        <Select name='icon' defaultValue={task.icon}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder={task.icon || 'emoji'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='💀'>💀</SelectItem>
              <SelectItem value='👻'>👻</SelectItem>
              <SelectItem value='👽'>👽</SelectItem>
              <SelectItem value='🤖'>🤖</SelectItem>
              <SelectItem value='👾'>👾</SelectItem>
              <SelectItem value='👹'>👹</SelectItem>
              <SelectItem value='👺'>👺</SelectItem>
              <SelectItem value='👿'>👿</SelectItem>
              <SelectItem value='💩'>💩</SelectItem>
              <SelectItem value='👶'>👶</SelectItem>
              <SelectItem value='👦'>👦</SelectItem>
              <SelectItem value='👧'>👧</SelectItem>
              <SelectItem value='🧒'>🧒</SelectItem>
              <SelectItem value='👩'>👩</SelectItem>
              <SelectItem value='🧑'>🧑</SelectItem>
              <SelectItem value='👨'>👨</SelectItem>
              <SelectItem value='👵'>👵</SelectItem>
              <SelectItem value='🧓'>🧓</SelectItem>
              <SelectItem value='👴'>👴</SelectItem>
              <SelectItem value='👲'>👲</SelectItem>
              <SelectItem value='👳'>👳</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='form-group'>
        <Label htmlFor='status'>Status</Label>
        <Select name='status' defaultValue={task.status}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder={task.status || 'Status'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='not started'>
                <span className='mr-2 w-2 h-2 bg-gray-400 rounded-full inline-block'></span>
                Not Started
              </SelectItem>
              <SelectItem value='in progress'>
                <span className='mr-2 w-2 h-2 bg-orange-400 rounded-full inline-block'></span>
                In Progress
              </SelectItem>
              <SelectItem value='done'>
                <span className='mr-2 w-2 h-2 bg-green-400 rounded-full inline-block'></span>
                Done
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='form-group'>
        <Label htmlFor='priority'>Priority</Label>
        <Select name='priority' defaultValue={task.priority}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue
              placeholder={task.priority || 'Priority'}
              defaultValue={task.priority}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='low'>
                <span className='mr-2 w-2 h-2 bg-green-400 rounded-full inline-block'></span>
                Low
              </SelectItem>
              <SelectItem value='medium'>
                <span className='mr-2 w-2 h-2 bg-yellow-400 rounded-full inline-block'></span>
                Medium
              </SelectItem>
              <SelectItem value='high'>
                <span className='mr-2 w-2 h-2 bg-red-400 rounded-full inline-block'></span>
                High
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='form-group'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          name='description'
          id='description'
          defaultValue={task.description}
          cols={30}
          rows={10}
        />
      </div>

      <div className='form-footer'>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
};
