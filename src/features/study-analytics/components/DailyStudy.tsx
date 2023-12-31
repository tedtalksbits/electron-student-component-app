import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@tremor/react';
import { secondsToMinutes } from 'date-fns';
import { DailyStudyAnalytics } from '../types';
import ProgressDisplay from '@/components/ui/progress-display';
import { LucideFlame, LucideGanttChart, LucideMedal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { AchievmentDialog } from '@/features/gamification/components/AchievmentDialog';
import { calculateStreaks, filterByCurrentDate, goals } from '../util';

export const DailyStudy = ({
  analyticsData,
}: {
  analyticsData: DailyStudyAnalytics[];
}) => {
  const [filteredAnalyticsData, setFilteredAnalyticsData] = useState<
    DailyStudyAnalytics[]
  >([]);
  const currStudySession = filterByCurrentDate(analyticsData);
  const [selectedRange, setSelectedRange] = useState('');
  useEffect(() => {
    setFilteredAnalyticsData(analyticsData);
  }, [analyticsData]);

  /*
    ========================================
    Flashcard goals
    ========================================
  */

  const isStudied20Cards = goals.flashcards.isCompleted(
    'medium',
    currStudySession?.total_flashcards_studied
  );

  /*
    ========================================
    Duration goals
    ========================================
  */

  const isStudied10Minutes = goals.duration.isCompleted(
    'medium',
    currStudySession?.total_duration_sec
  );

  /*
    ========================================
    Progress
    ========================================
  */

  const studyProgress10Cards = goals.flashcards.calculateProgress(
    'easy',
    currStudySession?.total_flashcards_studied
  );
  const studyProgress20Cards = goals.flashcards.calculateProgress(
    'medium',
    currStudySession?.total_flashcards_studied
  );
  const studyProgress5Min = goals.duration.calculateProgress(
    'easy',
    currStudySession?.total_duration_sec
  );
  const studyProgress10Min = goals.duration.calculateProgress(
    'medium',
    currStudySession?.total_duration_sec
  );

  const barchartData = filteredAnalyticsData?.map((studySession) => {
    return {
      ...studySession,
      'Flashcards Studied': studySession.total_flashcards_studied || 0,
      study_date: new Date(studySession.study_date).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
        }
      ),
    };
  });

  const handleBarchartDataRangeChange = (range: string) => {
    switch (range) {
      case 'day':
        setSelectedRange('day');
        setFilteredAnalyticsData(
          analyticsData.filter((studySession) => {
            const today = new Date();
            const studySessionDate = new Date(studySession.study_date);
            const diffTime = Math.abs(
              today.getTime() - studySessionDate.getTime()
            );
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays <= 1;
          })
        );
        break;
      case 'week':
        setSelectedRange('week');
        setFilteredAnalyticsData(
          analyticsData.filter((studySession) => {
            const today = new Date();
            const studySessionDate = new Date(studySession.study_date);
            const diffTime = Math.abs(
              today.getTime() - studySessionDate.getTime()
            );
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays <= 7;
          })
        );
        break;
      case 'month':
        setSelectedRange('month');
        setFilteredAnalyticsData(
          analyticsData.filter((studySession) => {
            const today = new Date();
            const studySessionDate = new Date(studySession.study_date);

            const year = today.getFullYear();
            const month = today.getMonth();

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);

            return (
              studySessionDate.getTime() >= firstDay.getTime() &&
              studySessionDate.getTime() <= lastDay.getTime()
            );
          })
        );
        break;
      case 'year':
        setSelectedRange('year');
        setFilteredAnalyticsData(
          analyticsData.filter((studySession) => {
            const today = new Date();
            const studySessionDate = new Date(studySession.study_date);
            // const diffTime = Math.abs(
            //   today.getTime() - studySessionDate.getTime()
            // );
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // return diffDays <= 365;

            return today.getFullYear() === studySessionDate.getFullYear();
          })
        );
        break;
      default:
        setSelectedRange('');
        setFilteredAnalyticsData(analyticsData);
        break;
    }
  };

  const { currentStreak, longestStreak } = calculateStreaks(analyticsData);

  return (
    <div className='flex flex-col gap-4'>
      {isStudied20Cards && isStudied10Minutes && <AchievmentDialog />}
      <Card className='border-none relative'>
        <CardHeader>
          <CardTitle className='flex items-center text-orange-400'>
            <LucideMedal className='mr-1' /> <p>Daily Goals</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <small className='text-foreground/50'>Daily Tasks</small>
          {/* 
          <span className='text-foreground block text-center'>
            {isStudied20Cards && isStudied10Minutes && (
              <div
                className='transition-all duration-500 ease-in-out'
                ref={(ref) => {
                  if (!ref) return;

                  // after 10s animate this element down, then remove it from the DOM
                  setTimeout(() => {
                    ref.style.transform = `translateY(20px)`;
                    ref.style.opacity = `0`;
                  }, 10000);

                  // after 10.5s remove this element from the DOM
                  setTimeout(() => {
                    ref.remove();
                  }, 10500);
                }}
              >
                <span className='inline-block ml-auto'>
                  Well Done!{' '}
                  <span className='animate-bounce inline-block'>🎊</span>
                </span>
                <div className='firework'></div>
                <div className='firework'></div>
                <div className='firework'></div>
              </div>
            )}
          </span> */}

          <ProgressDisplay
            progressDisplayType='cricle'
            label='Study 10 Cards'
            progress={studyProgress10Cards}
            total={100}
            className='relative [animation-delay:.45s]'
          >
            <span className='text-foreground/80'>
              {currStudySession?.total_flashcards_studied ?? 0}/10 Cards
            </span>
          </ProgressDisplay>

          <ProgressDisplay
            progressDisplayType='cricle'
            label='Study 20 Cards'
            progress={studyProgress20Cards}
            total={100}
            className='relative [animation-delay:.6s]'
          >
            <span className='text-foreground/80'>
              {currStudySession?.total_flashcards_studied ?? 0}/20 Cards
            </span>
          </ProgressDisplay>

          <ProgressDisplay
            progressDisplayType='cricle'
            label='Study 5 Minutes'
            progress={studyProgress5Min}
            total={100}
            className='[animation-delay:.75s]'
          >
            <span className='text-foreground/80 text-sm'>
              {secondsToMinutes(currStudySession?.total_duration_sec ?? 0)}/5
              mins
            </span>
          </ProgressDisplay>

          <ProgressDisplay
            progressDisplayType='cricle'
            label='Study 10 Minutes'
            progress={studyProgress10Min}
            total={100}
            className=''
          >
            <span className='text-foreground/80 text-sm'>
              {secondsToMinutes(currStudySession?.total_duration_sec ?? 0)}/10
              mins
            </span>
          </ProgressDisplay>
        </CardContent>
      </Card>
      <Card className='border-none'>
        <CardHeader>
          <div className=''>
            <CardTitle className='flex items-center text-orange-400'>
              <LucideGanttChart className='mr-1' /> <p>Daily Studying</p>
              <div className='ml-auto flex z-50'>
                <Label htmlFor='day' className='cb-label'>
                  <input
                    type='radio'
                    id='day'
                    onChange={() => handleBarchartDataRangeChange('day')}
                    name='range'
                    checked={selectedRange === 'day'}
                  />
                  D
                </Label>
                <Label htmlFor='week' className='cb-label'>
                  <input
                    type='radio'
                    id='week'
                    onChange={() => handleBarchartDataRangeChange('week')}
                    name='range'
                    checked={selectedRange === 'week'}
                  />
                  W
                </Label>
                <Label htmlFor='month' className='cb-label'>
                  <input
                    type='radio'
                    id='month'
                    onChange={() => handleBarchartDataRangeChange('month')}
                    name='range'
                    checked={selectedRange === 'month'}
                  />
                  M
                </Label>
                <Label htmlFor='year' className='cb-label'>
                  <input
                    type='radio'
                    id='year'
                    onChange={() => handleBarchartDataRangeChange('year')}
                    name='range'
                    checked={selectedRange === 'year'}
                  />
                  Y
                </Label>
                <Label htmlFor='all' className='cb-label'>
                  <input
                    type='radio'
                    id='all'
                    onChange={() => handleBarchartDataRangeChange('')}
                    name='range'
                    checked={selectedRange === ''}
                  />
                  ALL
                </Label>
              </div>
            </CardTitle>
            <div className='text-foreground/50'>
              <small>Streaks</small>
            </div>
            <div className='mt-2 flex items-center justify-between'>
              {currentStreak > 0 ? (
                <Badge
                  className='text-xs bg-secondary hover:bg-secondary/90 text-foreground whitespace-nowrap'
                  title='Current Streak  of studying'
                >
                  Current: {currentStreak} day(s)
                  {currentStreak >= 3 && (
                    <LucideFlame className='inline-block h-5 w-5 text-orange-400' />
                  )}
                </Badge>
              ) : (
                <Badge className='bg-orange-400/50 hover:bg-orange-400/90 text-foreground'>
                  No streak
                </Badge>
              )}
              {longestStreak > 0 && (
                <Badge className='bg-orange-400/50 text-white hover:bg-orange-400/90 text-foreground'>
                  Longest: {longestStreak} day(s)
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BarChart
            showAnimation
            className='mt-6 '
            data={barchartData}
            categories={['Flashcards Studied']}
            index='study_date'
            colors={['orange']}
          />
        </CardContent>
      </Card>
    </div>
  );
};
