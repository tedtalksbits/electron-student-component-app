import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/hooks/redux';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { createTask } from '../api';
import { setTasks } from '@/features/slice/task-slice';
import { USER_ID } from '@/constants';

export const AddTaskDialogForm = ({
  project_id,
}: {
  project_id: string | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!project_id) return console.log('project_id is undefined');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.project_id = project_id;
    data.user_id = USER_ID.toString();
    createTask(data, (data) => dispatch(setTasks(data)));
    toast({
      title: 'Task added',
      description: 'Task has been added successfully',
      variant: 'default',
    });
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <div className='cursor-pointer border p-1 rounded-md peer'>
            <PlusIcon
              size={14}
              className='hover:text-primary text-primary/80'
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add New Project</DialogTitle>
          <form className='form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <Label htmlFor='name'>Name</Label>
              <Input type='text' name='name' id='name' required />
            </div>
            <div className='form-group'>
              <Label htmlFor='icon'>Icon</Label>
              <Select name='icon' required defaultValue='💀'>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue defaultValue={'💀'} />
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
              <Select name='status' required defaultValue='not started'>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue
                    placeholder={'Status'}
                    defaultValue={'not started'}
                  />
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
              <Select name='priority' defaultValue='low'>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder={'Priority'} defaultValue='low' />
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
                cols={30}
                rows={10}
              />
            </div>

            <div className='form-footer'>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
