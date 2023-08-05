import { useAppSelector } from '@/hooks/redux';
import { NavLink } from 'react-router-dom';
import { AddProjectDialogForm } from './AddProjectDialogForm';

export const ProjectsNavigation = () => {
  const projects = useAppSelector((state) => state.projectsData.projects);
  return (
    <div className='p-2'>
      <div className='flex justify-between items-center my-4 border-b pb-4'>
        <h2 className='text-lg font-medium'>Projects</h2>
        <AddProjectDialogForm />
      </div>
      {projects.map((project) => (
        <NavLink
          key={project.id}
          to={`/taskify/tasks/${project.id}`}
          className={({ isActive }) =>
            (isActive ? 'bg-sky-600 text-white' : '') +
            ' block p-2 rounded-md text-center my-2 hover:bg-sky-600 hover:text-white transition-colors duration-300 ease-in-out'
          }
          onClick={() => setLastVisitedProject(project.id)}
        >
          {project.icon} {project.name}
        </NavLink>
      ))}
    </div>
  );
};

function setLastVisitedProject(projectId: number) {
  localStorage.setItem('lastVisitedProject', projectId.toString());
}
