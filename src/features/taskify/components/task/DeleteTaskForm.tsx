import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import { deleteTask } from '../../api/index';
import { useAppDispatch } from '@/hooks/redux';
import { Task, setTasks } from '@/features/slice/task-slice';

export const DeleteTaskForm = ({
  task,
  onMutation,
}: {
  task: Task;
  onMutation: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const refetchTasksQuery = `SELECT * FROM project_tasks WHERE project_id = ${task.project_id} AND user_id = ${task.user_id}`;
    deleteTask(
      Number(task.id),
      (data) => dispatch(setTasks(data)),
      refetchTasksQuery
    );
    setOpen(false);
    onMutation();
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant='destructive'>
          <Trash size={14} /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className='mt-auto'>
        <DialogTitle>Delete {task.name}?</DialogTitle>

        <div className='form-footer'>
          <Button type='button' variant='destructive' onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
