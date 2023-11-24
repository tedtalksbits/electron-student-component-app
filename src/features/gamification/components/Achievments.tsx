import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { TotalStudyAnalyticsGamificationEngine } from '@/utils/gamification.engine';
import { Tilt } from 'react-tilt';

const defaultOptions = {
  reverse: true, // reverse the tilt direction
  max: 50, // max tilt rotation (degrees)
  perspective: 2000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.01, // 2 = 200%, 1.5 = 150%, etc..
  speed: 2000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
  glare: true, // if it should have a "glare" effect
};
export const Achievments = ({
  gamificationEngine,
}: {
  gamificationEngine: TotalStudyAnalyticsGamificationEngine | null;
}) => {
  if (!gamificationEngine)
    return (
      <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500'></div>
    );

  return (
    <div className='grid grid-cols-5 gap-1 animate-fade-in'>
      {gamificationEngine?.getAllBadges()?.map((badge) => (
        <HoverCard key={badge.name}>
          <HoverCardTrigger className='cursor-pointer'>
            <div className='relative'>
              <img
                className={`w-full h-8 object-contain animate-fade-in ${
                  badge.condition ? 'filter-none' : 'grayscale'
                }`}
                src={badge.image}
                alt={badge.name}
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className='text-center relative'>
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-400 to-red-500 opacity-50 rounded-md z-[-1]'></div>
            <Tilt
              options={defaultOptions}
              className='w-24 h-24 rounded-md bg-white/30 border-white/10 border-4 backdrop-blur-sm flex items-center justify-center cursor-pointer mx-auto hover:shadow-lg shadow-slate-50'
            >
              <img src={badge.image} alt='' className='translate-z-200' />
            </Tilt>
            <div className='mt-4'>
              <h1 className='font-semibold mb-1'>{badge.name}</h1>
              <p className='text-xs text-foreground/60'>{badge.description}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};
