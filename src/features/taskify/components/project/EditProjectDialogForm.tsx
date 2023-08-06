import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { Project, setProjects } from '@/features/slice/project-slice';
import IconSelection from '../IconSelection';
import { getTasks, updateProject } from '../../api';
import { useAppDispatch } from '@/hooks/redux';
import { Zone } from '@/components/zones/Zone';
import { deleteProject } from '../../api/index';

type EditProjectDialogFormProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  project?: Project;
};
export const EditProjectDialogForm = ({
  show,
  setShow,
  project,
}: EditProjectDialogFormProps) => {
  const dispatch = useAppDispatch();

  if (!project) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const refreshQuery = `SELECT * FROM projects`;
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    updateProject(
      project.id,
      data,
      (data) => dispatch(setProjects(data)),
      refreshQuery
    );

    getTasks((data) => dispatch(setProjects(data)));
    setShow(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const refreshQuery = `SELECT * FROM projects`;
    deleteProject(
      project.id,
      (data) => dispatch(setProjects(data)),
      refreshQuery
    );
    setShow(false);
  };

  return (
    <Dialog open={show} onOpenChange={() => setShow(!open)}>
      <DialogContent>
        <DialogTitle>
          <div>
            <h2 className='text-lg font-semibold'>Update Project</h2>
            <div className='flex gap-2 text-xs text-muted'>
              <span>Last updated:</span>
              <span>{new Date(project.updated_at).toLocaleString()}</span>
            </div>
          </div>
        </DialogTitle>
        <form onSubmit={handleSubmit} className='form'>
          <IconSelection defaultValue={project.icon} />
          <div className='form-group'>
            <Label htmlFor='name'>name</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='name'
              defaultValue={project.name}
              required
            />
          </div>

          <div className='form-footer'>
            <Button type='submit'>Save</Button>
          </div>
        </form>
        <Zone variant='destructive' title='Danger Zone'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <p className='text-sm font-medium'>Delete Project</p>
              <small className='text-xs'>This action cannot be undone</small>
            </div>
            <Button onClick={handleDelete} variant='destructive'>
              Delete Project
            </Button>
          </div>
        </Zone>
      </DialogContent>
    </Dialog>
  );
};
