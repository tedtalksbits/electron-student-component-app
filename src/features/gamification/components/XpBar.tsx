import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { TotalStudyAnalytics } from '@/features/study-analytics/types';
import { TotalStudyAnalyticsGamificationEngine } from '@/utils/gamification.engine';
import { HoverCardContent } from '@radix-ui/react-hover-card';
import { useEffect, useMemo, useRef } from 'react';
import { animate, motion } from 'framer-motion';
import { DiamondIcon } from 'lucide-react';

export const XpBar = ({
  analyticsData,
}: {
  analyticsData: TotalStudyAnalytics;
}) => {
  const gamificationEngine = useMemo(() => {
    return new TotalStudyAnalyticsGamificationEngine(analyticsData);
  }, [analyticsData]);

  if (!gamificationEngine || !gamificationEngine.getLevel()) {
    console.warn('Gamification engine not initialized');
    return null;
  }

  return (
    <div className='flex items-center gap-4'>
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
        value={gamificationEngine.getProgress()}
      />
      <HoverCard>
        <HoverCardTrigger className='cursor-default text-[.75rem] text-foreground/50 flex'>
          <Counter
            from={gamificationEngine?.getCurrentXp() - 50}
            to={gamificationEngine?.getCurrentXp()}
          />
          /{gamificationEngine?.getLevel().nextLevelXp}
        </HoverCardTrigger>
        <HoverCardContent className='text-foreground/50 transition-all ease-in-out duration-300 bg-secondary p-1 rounded-sm'>
          {gamificationEngine?.getProgress()} % Completed
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
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
