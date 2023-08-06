import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setProjects } from '@/features/slice/project-slice';
import { getProjects } from '../api';
import { AddProjectDialogForm } from '../components/AddProjectDialogForm';

export const Taskify = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.project.projects);
  const lastAddedProject = projects[projects.length - 1]?.id;
  const navigate = useNavigate();
  useEffect(() => {
    const lastVisitedProject = localStorage.getItem('lastVisitedProject');
    getProjects((data) => dispatch(setProjects(data)));
    if (lastVisitedProject) {
      return navigate(`/taskify/tasks/${lastVisitedProject}`);
    }
    navigate(`/taskify/tasks/${lastAddedProject}`);
  }, [dispatch, lastAddedProject, navigate]);

  if (projects.length === 0)
    return (
      <div>
        <AddProjectDialogForm />
      </div>
    );
};
