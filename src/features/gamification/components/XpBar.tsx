import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';
import { HoverCardContent } from '@radix-ui/react-hover-card';
import { useEffect, useRef } from 'react';
import { animate, motion } from 'framer-motion';
import { DiamondIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { UserLevel } from '@/features/user/types';
import { StudyUrlState } from '@/features/study/routes/Study';

export const XpBar = ({
  userLevelAndXp,
}: {
  userLevelAndXp: UserLevel | null;
}) => {
  const location = useLocation();
  const state = location.state as StudyUrlState;
  if (!userLevelAndXp)
    return (
      <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500'></div>
    );
  const {
    total_xp: userTotalXp,
    current_level_xp: levelMinXp,
    next_level_xp: levelMaxXp,
    level,
  } = userLevelAndXp;

  const lastXpGained = state?.prevXp ? userTotalXp - state.prevXp : 0;

  const totalLevelXp = levelMaxXp - levelMinXp;
  const totalXpGained = userTotalXp - levelMinXp;
  const levelProgress = ((totalXpGained / totalLevelXp) * 100).toFixed(1);

  // watch for increase or decrease in userLevelAndXp.total_xp
  // if it increases, animate the increase

  return (
    <div className='flex items-center gap-4'>
      <motion.h4
        className='animate-in'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <DiamondIcon /> <span className='text-center'>Lv.</span>
      </motion.h4>
      <HoverCard>
        <HoverCardTrigger className='cursor-default level font-bold text-lg relative'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {level}
          </motion.div>
        </HoverCardTrigger>
        <HoverCardContent className='z-10 text-foreground/50 transition-all ease-in-out duration-300 bg-secondary p-1 rounded-sm'>
          Total XP: {Number(userTotalXp)} XP
        </HoverCardContent>
      </HoverCard>
      <motion.div
        key={levelProgress}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {/* <Progress
          className='m-0 col-span-2 [&>.indicator]:bg-orange-400 bg-secondary'
          // value={Number(levelProgress)}
          value={val}
        /> */}
        <div className='relative w-[10rem] h-2 rounded-full bg-secondary'>
          <div
            style={{ width: `${levelProgress}%` }}
            className='absolute top-0 left-0 h-2 rounded-full bg-orange-400'
          ></div>
        </div>
      </motion.div>

      <HoverCard>
        <HoverCardTrigger className='cursor-default text-[.75rem] text-foreground/50 flex relative'>
          <Counter
            from={totalXpGained - lastXpGained}
            to={Number(totalXpGained)}
          />
          <span>/{levelMaxXp - levelMinXp}</span>
          {lastXpGained > 0 && (
            <div
              ref={(ref) => {
                if (!ref) return;
                ref.style.transform = `translateY(0px)`;
                ref.style.opacity = `0`;

                setTimeout(() => {
                  ref.style.transform = `translateY(-20px)`;
                  ref.style.opacity = `1`;
                }, 300);

                setTimeout(() => {
                  ref.style.transform = `translateY(0px)`;
                  ref.style.opacity = `0`;
                }, 1700);
              }}
              className='text-xs text-success/70 font-bold absolute top-0 right-0 transition-all ease-in-out delay-75 duration-300'
            >
              +{lastXpGained}xp
            </div>
          )}
          {/* once the animation above animate in the word "XP" */}
          <span className='ml-1'>XP</span>
        </HoverCardTrigger>
        <HoverCardContent className='z-10 text-foreground/50 transition-all ease-in-out duration-300 bg-secondary p-1 rounded-sm'>
          <div className='block'>{levelProgress} % Completed</div>
          <div className='block'>
            Xp to next level: {userLevelAndXp.next_level_xp - userTotalXp}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(Number(from), Number(to), {
      duration: 1,
      ease: 'easeInOut',
      type: 'tween',
      delay: 0.75,
      onUpdate(value) {
        if (node === null) return;
        node.textContent = value.toFixed(0);
        node.style.setProperty('--progress', String(value));
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <p ref={nodeRef} />;
}
