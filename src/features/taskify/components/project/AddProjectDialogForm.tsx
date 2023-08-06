import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { createProject } from '../../api';
import { useAppDispatch } from '@/hooks/redux';
import { setProjects } from '@/features/slice/project-slice';
import { USER_ID } from '@/constants';
import { PlusIcon } from 'lucide-react';

export const AddProjectDialogForm = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.user_id = USER_ID.toString();
    createProject(data, (data) => dispatch(setProjects(data)));
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
          <form onSubmit={handleSubmit} className='form'>
            <div className='form-group'>
              <Label htmlFor='name'>name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='name'
                required
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
