import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTasksByProjectId, updateTask } from '../api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Task, setTasks } from '@/features/slice/task-slice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { AddTaskDialogForm } from '../components/task/AddTaskDialogForm';
import { USER_ID } from '@/constants';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TaskUpdate } from '../components/task/TaskUpdate';
export const Tasks = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    getTasksByProjectId(Number(id), (data) => dispatch(setTasks(data)));
  }, [id, dispatch]);

  const handleEdit = (task: Partial<Task>, id: number, project_id: number) => {
    const refetchQuery = `SELECT * FROM project_tasks WHERE project_id = ${project_id} AND user_id = ${USER_ID}`;
    updateTask(id, task, (data) => dispatch(setTasks(data)), refetchQuery);
  };

  const tasks = useAppSelector((state) => state.task.tasks);

  const tagColors = {
    'not started': 'bg-gray-700/50 border border-gray-700/50',
    'in progress': 'bg-orange-500/50 border border-orange-500/50',
    done: 'bg-green-500/50 border border-green-500/50',
    low: 'bg-green-500/50 border border-green-500/50',
    medium: 'bg-yellow-500/50 border border-yellow-500/50',
    high: 'bg-red-500/50 border border-red-500/50',
  };

  const priorities = ['low', 'medium', 'high'] as const;
  const statuses = ['not started', 'in progress', 'done'] as const;

  return (
    <>
      <div className='flex items-center gap-4 my-4 '>
        <h2 className='text-lg font-medium'>Tasks</h2>
        <AddTaskDialogForm project_id={id} />
      </div>
      <Card>
        <CardHeader>All Tasks</CardHeader>
        <CardContent>
          <Table className='table-auto w-full'>
            <TableHeader>
              <TableRow>
                {['Icon', 'Name', 'Status', 'Priority', 'Created'].map(
                  (item) => (
                    <TableHead key={item}>{item}</TableHead>
                  )
                )}

                <TableHead className='2xl:block hidden'>Descriptions</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.icon}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2' key={task.id}>
                      <label htmlFor={task.id.toString()}>
                        <input
                          type='checkbox'
                          name=''
                          id={task.id.toString()}
                          className='checkbox-fancy'
                          checked={task.status === 'done'}
                          onChange={() =>
                            handleEdit(
                              {
                                status:
                                  task.status === 'done'
                                    ? 'not started'
                                    : 'done',
                              },
                              task.id,
                              task.project_id
                            )
                          }
                        />
                        {task.name}
                      </label>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            tagColors[task.status]
                          }`}
                        >
                          {task.status}
                        </span>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className='flex items-center gap-2 flex-col'>
                          {statuses.map((item) => (
                            <button
                              type='button'
                              key={item}
                              className={`px-2 py-1 rounded-full text-xs ${tagColors[item]} w-full hover:bg-opacity-100 hover:border-opacity-100`}
                              onClick={() =>
                                handleEdit(
                                  { status: item },
                                  task.id,
                                  task.project_id
                                )
                              }
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            tagColors[task.priority]
                          }`}
                        >
                          {task.priority}
                        </span>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className='flex items-center gap-2 flex-col'>
                          {priorities.map((item) => (
                            <button
                              type='button'
                              key={item}
                              className={`px-2 py-1 rounded-full text-xs ${tagColors[item]} w-full hover:bg-opacity-100 hover:border-opacity-100`}
                              onClick={() =>
                                handleEdit(
                                  { priority: item },
                                  task.id,
                                  task.project_id
                                )
                              }
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>
                    {new Date(task.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell className='2xl:block hidden text-constraint'>
                    {task.description || 'No description'}
                  </TableCell>
                  <TableCell>
                    <TaskUpdate task={task} key={task.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
