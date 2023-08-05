import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getProjects } from '../api';
import { setProjects } from '../slice/project-slice';
import { useNavigate } from 'react-router-dom';
import { AddProjectDialogForm } from '../components/AddProjectDialogForm';

export const Taskify = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projectsData.projects);
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
