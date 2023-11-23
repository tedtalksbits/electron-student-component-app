import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        if (props.children) {
          return (
            <Toast key={id} {...props}>
              {props.icon ? (
                <div className='flex gap-4'>
                  <div>{props.icon}</div>
                  <div className='flex-1'>{props.children}</div>
                </div>
              ) : (
                <>{props.children}</>
              )}

              {action}
              <ToastClose />
            </Toast>
          );
        }
        return (
          <Toast key={id} {...props}>
            <div className='flex gap-4 items-start'>
              {props.icon && <div>{props.icon}</div>}

              <div className='grid gap-1'>
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
