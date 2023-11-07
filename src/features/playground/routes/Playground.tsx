import { AppsGrid } from '@/components/navigation/AppsGrid';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { useState } from 'react';
import { routes } from '../../../routes/index';

export const Playground = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(['']);
  const run = () => {
    window.electron.ipcRenderer.sendMessage('run-code', code);
    window.electron.ipcRenderer.on('run-code-reply', (reply) => {
      console.log(reply);
      setOutput([...output, reply as string]);
    });
  };
  return (
    <div>
      {/* <h1>Playground</h1>
      <h2>Output</h2>

      <code>
        <pre>{output.join('\n')}</pre>
      </code>
      <Textarea
        onChange={(e) => setCode(e.target.value)}
        className='h-full w-full'
      />
      <Button onClick={run}>Run</Button> */}
      <AppsGrid
        routes={routes.playground.routes.filter((route) => !route.index)}
      />
    </div>
  );
};
