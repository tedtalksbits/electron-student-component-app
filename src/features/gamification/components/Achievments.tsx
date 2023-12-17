import { UserLevel } from '@/features/user/types';
import { Tilt } from 'react-tilt';
import { getLevelAndXpBadges, getStudyAnalyticsBadges } from '../utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StudyAnalyticsState } from '@/features/study-analytics/types';

const defaultOptions = {
  reverse: true, // reverse the tilt direction
  max: 25, // max tilt rotation (degrees)
  perspective: 2000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 2000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
  glare: true, // if it should have a "glare" effect
  'max-glare': 0.5, // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
};
export const Achievments = ({
  userLevelAndXp,
  analyticsData,
}: {
  userLevelAndXp: UserLevel | null;
  analyticsData: StudyAnalyticsState;
}) => {
  if (!userLevelAndXp)
    return (
      <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500'></div>
    );
  const analyticsBadges = getStudyAnalyticsBadges(analyticsData);
  const totalAnalyticsBadges = analyticsBadges?.length;
  const toAnalyticsBadgesEarnedBadges = analyticsBadges?.filter(
    (badge) => badge.condition
  ).length;
  const xpAndLevelBadges = getLevelAndXpBadges(userLevelAndXp);
  const totalXpLevelBadges = xpAndLevelBadges?.length;
  const toXpLevelBadgesEarnedBadges = xpAndLevelBadges?.filter(
    (badge) => badge.condition
  ).length;
  return (
    <div className='h-36 overflow-scroll'>
      <div className='grid grid-cols-4 gap-1 animate-fade-in'>
        <div className='col-span-4'>
          <p className='text-foreground/50 text-xs'>
            {toXpLevelBadgesEarnedBadges} / {totalXpLevelBadges} badges earned
          </p>
        </div>
        {xpAndLevelBadges?.map((badge) => (
          <div className='achievement' key={badge.name}>
            <Dialog>
              <DialogTrigger>
                <div className='relative cursor-pointer achievement-img-container'>
                  <img
                    className={`w-full h-12 object-contain animate-fade-in ${
                      badge.condition ? 'filter-none' : 'grayscale blur-sm'
                    }`}
                    src={badge.image}
                    alt={badge.name}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className='my-4'>
                  <DialogTitle className='text-center text-3xl font-bold font-serif'>
                    {badge.name}
                  </DialogTitle>
                  <small className='text-center w-[50ch] mx-auto text-foreground/80'>
                    {badge.description}
                  </small>
                </DialogHeader>

                <div className='relative flex items-center justify-center'>
                  {/* create a glowing light effect behind using conic gradient */}
                  <div className='absolute w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400 to-[65%] z-[-1] animate-in'></div>

                  <img
                    className='absolute w-96 h-96 blur-md animate-fade-in z-[-1]'
                    src={badge.image}
                    alt={badge.name}
                  />
                  <Tilt options={defaultOptions}>
                    <img
                      className={`w-full h-96 object-contain animate-fade-in ${
                        badge.condition ? 'filter-none' : 'grayscale blur-lg'
                      }`}
                      src={badge.image}
                      alt={badge.name}
                    />
                  </Tilt>
                </div>
                <div className='lore'>
                  <p className='text-center w-[40ch] mx-auto text-foreground/90'>
                    {badge.lore}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
      {/* ANALYTICS BADGES */}
      <div className='grid grid-cols-4 gap-1 animate-fade-in mt-4'>
        <div className='col-span-4'>
          <p className='text-foreground/50 text-xs'>
            {toAnalyticsBadgesEarnedBadges} / {totalAnalyticsBadges} badges
            earned
          </p>
        </div>
        {analyticsBadges?.map((badge) => (
          <div className='achievement' key={badge.name}>
            <Dialog>
              <DialogTrigger>
                <div className='relative cursor-pointer achievement-img-container'>
                  <img
                    className={`w-full h-12 object-contain animate-fade-in ${
                      badge.condition ? 'filter-none' : 'grayscale blur-sm'
                    }`}
                    src={badge.image}
                    alt={badge.name}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className='my-4'>
                  <DialogTitle className='text-center text-3xl font-bold font-serif'>
                    {badge.name}
                  </DialogTitle>
                  <small className='text-center w-[50ch] mx-auto text-foreground/80'>
                    {badge.description}
                  </small>
                </DialogHeader>

                <div className='relative flex items-center justify-center'>
                  {/* create a glowing light effect behind using conic gradient */}
                  <div className='absolute w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400 to-[65%] z-[-1] animate-in'></div>

                  <img
                    className='absolute w-96 h-96 blur-md animate-fade-in z-[-1]'
                    src={badge.image}
                    alt={badge.name}
                  />
                  <Tilt options={defaultOptions}>
                    <img
                      className={`w-full h-96 object-contain animate-fade-in ${
                        badge.condition ? 'filter-none' : 'grayscale blur-lg'
                      }`}
                      src={badge.image}
                      alt={badge.name}
                    />
                  </Tilt>
                </div>
                <div className='lore'>
                  <p className='text-center w-[40ch] mx-auto text-foreground/90'>
                    {badge.lore}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
      {/* ANALYTICS BADGES */}
    </div>
  );
};
