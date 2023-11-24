import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { TotalStudyAnalyticsGamificationEngine } from '@/utils/gamification.engine';
import { HoverCardContent } from '@radix-ui/react-hover-card';
import { useEffect, useRef } from 'react';
import { animate, motion } from 'framer-motion';
import { DiamondIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const XpBar = ({
  gamificationEngine,
}: {
  gamificationEngine: TotalStudyAnalyticsGamificationEngine | null;
}) => {
  const location = useLocation();
  const state = location.state as {
    study: boolean;
    prevXp: { total_xp: number };
    prevLevel: number;
  };

  if (!gamificationEngine || !gamificationEngine?.getLevel())
    return (
      <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500'></div>
    );
  const xpGain =
    state?.prevXp?.total_xp &&
    gamificationEngine?.getCurrentXp() - state?.prevXp?.total_xp;
  const xpWithoutGain = gamificationEngine?.getCurrentXp() - (xpGain || 0);
  return (
    <div className='flex items-center gap-4'>
      {/* {JSON.stringify(state)}
      {state?.prevXp && state.prevXp.total_xp}
      {state?.study && 'studied'} */}
      {/* {xpGain} */}
      {/* {JSON.stringify(state?.prevLevel)} */}

      {state?.prevLevel &&
        state?.prevLevel > gamificationEngine?.getLevel()?.level && (
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
            Level up!
          </div>
        )}
      <motion.h4
        className='animate-in'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <DiamondIcon /> XP
      </motion.h4>
      <HoverCard>
        <HoverCardTrigger className='cursor-default level font-bold text-lg relative'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {gamificationEngine?.getLevel()?.level}
          </motion.div>
        </HoverCardTrigger>
        <HoverCardContent className='text-foreground/50 transition-all ease-in-out duration-300 bg-secondary p-1 rounded-sm'>
          {gamificationEngine?.getCurrentXp()} XP
        </HoverCardContent>
      </HoverCard>
      <Progress
        className='m-0 col-span-2 [&>.indicator]:bg-orange-400 bg-secondary'
        value={gamificationEngine?.getProgress()}
      />

      <HoverCard>
        <HoverCardTrigger className='cursor-default text-[.75rem] text-foreground/50 flex relative'>
          <Counter
            from={xpWithoutGain}
            to={gamificationEngine?.getCurrentXp()}
          />
          <span>/{gamificationEngine?.getLevel()?.nextLevelXp}</span>
          {state?.prevXp && (
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
              +{gamificationEngine?.getCurrentXp() - state.prevXp.total_xp}xp
            </div>
          )}
          {/* once the animation above animate in the word "XP" */}
          <span className='ml-1'>XP</span>
        </HoverCardTrigger>
        <HoverCardContent className='text-foreground/50 transition-all ease-in-out duration-300 bg-secondary p-1 rounded-sm'>
          <div className='block'>
            {gamificationEngine?.getProgress()} % Completed
          </div>
          <div className='block'>
            Xp to next level:{' '}
            {gamificationEngine?.getLevel()?.nextLevelXp -
              gamificationEngine?.getCurrentXp()}
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
