import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Task } from '@/features/slice/task-slice';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { EditTaskForm } from './EditTaskForm';
import { Zone } from '@/components/zones/Zone';
import { DeleteTaskForm } from './DeleteTaskForm';
import Markdown from '@/components/markdown/Markdown';

export const TaskUpdate = ({ task }: { task: Task }) => {
  const [openSheet, setOpenSheet] = React.useState(false);
  return (
    <Sheet
      open={openSheet}
      onOpenChange={() => setOpenSheet(!openSheet)}
      key={task.id}
    >
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
            <Zone variant='destructive' className='mt-96' title='Danger Zone'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <p className='text-sm font-medium'>Delete Task</p>
                  <small className='text-xs'>
                    This action cannot be undone
                  </small>
                </div>
                <DeleteTaskForm
                  task={task}
                  onMutation={() => setOpenSheet(false)}
                />
              </div>
            </Zone>
          </TabsContent>
          <TabsContent value='view'>
            <p className='my-4'>Description</p>
            <Markdown>{task.description || 'No description'}</Markdown>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
