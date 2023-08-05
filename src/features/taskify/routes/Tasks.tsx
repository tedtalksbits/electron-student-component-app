import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTasksByProjectId, updateTask } from '../api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Task, setTasks } from '../slice/task-slice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ArrowRight } from 'lucide-react';
import { EditTaskForm } from '../components/EditTaskForm';
import Markdown from '@/components/markdown/Markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
export const Tasks = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    getTasksByProjectId(Number(id), (data) => dispatch(setTasks(data)));
  }, [id, dispatch]);

  const handleEdit = (task: Partial<Task>, id: number) => {
    console.log('clicked');
    updateTask(id, task, (data) => dispatch(setTasks(data)));
  };

  const tasks = useAppSelector((state) => state.tasksData.tasks);

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
    <div>
      <Table className='table-auto w-full'>
        <TableHeader>
          <TableRow>
            {['Name', 'Status', 'Priority', 'Created'].map((item) => (
              <TableHead key={item}>{item}</TableHead>
            ))}

            <TableHead className='2xl:block hidden'>Descriptions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
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
                              task.status === 'done' ? 'not started' : 'done',
                          },
                          task.id
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
                          onClick={() => handleEdit({ status: item }, task.id)}
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
                            handleEdit({ priority: item }, task.id)
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
                <Sheet>
                  <SheetTrigger asChild>
                    <button className='btn btn-primary'>
                      <ArrowRight />
                    </button>
                  </SheetTrigger>
                  <SheetContent className='min-w-[600px]'>
                    <Tabs defaultValue='view'>
                      <TabsList>
                        <TabsTrigger value='edit'>Edit</TabsTrigger>
                        <TabsTrigger value='view'>View</TabsTrigger>
                      </TabsList>
                      <TabsContent value='edit'>
                        <EditTaskForm task={task} />
                      </TabsContent>
                      <TabsContent value='view'>
                        <p className='my-4'>Description</p>
                        <Markdown>
                          {task.description || 'No description'}
                        </Markdown>
                      </TabsContent>
                    </Tabs>
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
