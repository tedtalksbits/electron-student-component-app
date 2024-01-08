import { cn } from '@/lib/utils';
import { Input } from './input';

type FileDropProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;
export const FileDrop = (props: FileDropProps) => {
  return (
    <>
      <Input
        className={cn('tw-file-input', props.className)}
        id='fileUpload'
        type='file'
        data-drop-zone='true'
        {...props}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.currentTarget.classList.add('tw-file-input--drag');
          e.currentTarget.classList.remove('tw-file-input--dropped');
          props.onDragEnter?.(e);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.currentTarget.classList.remove('tw-file-input--drag');
          e.currentTarget.classList.remove('tw-file-input--dropped');
          props.onDragLeave?.(e);
        }}
        onDrop={(e) => {
          console.log('drop');
          e.currentTarget.classList.remove('tw-file-input--drag');
          e.currentTarget.classList.add('tw-file-input--dropped');
          const file = e.dataTransfer?.files?.[0];
          if (!file) {
            return;
          }
          console.log(file);
          // set data-file-name attr to file name
          e.currentTarget.setAttribute('data-file-name', file.name);
          props.onDrop?.(e);
        }}
      />
    </>
  );
};
