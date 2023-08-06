import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AddProjectDialogForm } from './project/AddProjectDialogForm';
import { EditProjectDialogForm } from './project/EditProjectDialogForm';
import { useAppSelector } from '@/hooks/redux';
import { Project } from '@/features/slice/project-slice';

export const ProjectsNavigation = () => {
  const projects = useAppSelector((state) => state.project.projects);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  function openOnDoubleClick(project: Project) {
    setSelectedProject(project);
    setOpen(true);
  }
  return (
    <div className='p-4 flex flex-col h-full bg-accent'>
      <div className='flex justify-between items-center my-4 border-b pb-4'>
        <h2 className='text-lg font-medium'>Projects</h2>
        <AddProjectDialogForm />
      </div>
      {projects.map((project) => (
        <div key={project.id} onDoubleClick={() => openOnDoubleClick(project)}>
          <NavLink
            key={project.id}
            to={`/taskify/tasks/${project.id}`}
            className={({ isActive }) =>
              (isActive ? 'bg-muted text-white' : '') +
              ' block px-4 py-2 rounded-full text-left hover:bg-muted transition-colors duration-300 ease-in-out'
            }
            onClick={() => setLastVisitedProject(project.id)}
          >
            {project.icon} {project.name}
          </NavLink>
        </div>
      ))}
      <div className='mt-auto py-6'>Edit Projects</div>
      <EditProjectDialogForm
        project={selectedProject}
        setShow={setOpen}
        show={open}
      />
    </div>
  );
};

function setLastVisitedProject(projectId: number) {
  localStorage.setItem('lastVisitedProject', projectId.toString());
}
