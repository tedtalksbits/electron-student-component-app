import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useShortcuts } from '@/hooks/useShortcuts';
import React, { useCallback, useState } from 'react';

export const Terminal = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(['']);

  const run = useCallback(() => {
    if (!code) return;
    window.electron.ipcRenderer.sendMessage('run-code', code);
    window.electron.ipcRenderer.on('run-code-reply', (reply) => {
      console.log(reply);
      setOutput([...output, reply as string]);
    });
    setCode('');
  }, [code, output]);

  const executeShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        run();
      }
    },
    [run]
  );

  useShortcuts(executeShortcut);

  return (
    <div>
      <h1>Playground</h1>
      <h2>Output</h2>

      <code>
        <pre>{output.join('\n')}</pre>
      </code>
      <Textarea
        onChange={(e) => setCode(e.target.value)}
        className='h-full w-full'
        value={code}
      />
      <Button onClick={run}>Run</Button>
    </div>
  );
};
