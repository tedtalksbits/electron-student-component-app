import { XIcon } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

export const AchievmentDialog = ({
  title,
  achievement,
  imgSrc,
}: {
  title?: string;
  achievement?: string;
  imgSrc?: string;
}) => {
  const [show, setShow] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (show) {
      ref.current?.animate(
        [
          {
            transform: 'translateY(130px)',
            scale: '0.5',
            opacity: '0',
          },
          {
            transform: 'translateY(0px)',
            scale: '1',
            opacity: '1',
          },
        ],
        {
          duration: 500,
          easing: 'ease-in-out',
        }
      );
    }
  }, [show]);

  const handleClose = () => {
    ref.current?.animate(
      [
        {
          transform: 'translateY(0px)',
          scale: '1',
          opacity: '1',
        },
        {
          transform: 'translateY(130px)',
          scale: '0.5',
          opacity: '0',
        },
      ],
      {
        duration: 500,
        easing: 'ease-in-out',
      }
    );
    setTimeout(() => {
      setShow(false);
      // remove from dom

      ref.current?.remove();
    }, 500);
  };

  // close when escape is pressed
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div
      ref={ref}
      className='absolute left-0 right-0 top-10 bottom-0 rounded-3xl flex items-center justify-center bg-background z-[1000] transition-all ease-in-out duration-500 delay-75'
    >
      <button className='absolute top-4 right-5' onClick={handleClose}>
        <XIcon />
      </button>
      <div className='firework'></div>
      <div className='firework'></div>
      <div className='firework'></div>
      <div className='firework'></div>
      <div className='firework'></div>
      <div className='firework'></div>
      <motion.div className='flex flex-col gap-4 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.5 }}
          className='font-bold text-4xl'
        >
          {title || 'Achievement Unlocked'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.75 }}
          className='text-xl'
        >
          You have unlocked the <span className='font-bold'>Achievment</span>:{' '}
          {achievement}
        </motion.p>
        <motion.img
          src={
            imgSrc ||
            'https://media.giphy.com/media/3o7aDcz2zVqJQJgKTm/giphy.gif'
          }
          alt='Achievement Image'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 1 }}
        />
      </motion.div>
    </div>
  );
};
