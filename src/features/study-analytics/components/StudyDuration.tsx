import { StudySession } from '@/features/study/types';
import { Card, Text, Metric, Title, Divider } from '@tremor/react';
type StudyDurationProps = {
  studySessions: StudySession[];
};
export const StudyDuration = ({ studySessions }: StudyDurationProps) => {
  const totalDuration = studySessions.reduce((acc, curr) => {
    return (acc + curr.duration_sec) as number;
  }, 0);

  const totalFlashcardsStudied = studySessions.reduce((acc, curr) => {
    return (acc + curr.flashcards_studied) as number;
  }, 0);

  const totalStudySessions = studySessions.length;

  const averageDuration = totalDuration / totalStudySessions;

  return (
    <Card>
      <Title>Study Duration</Title>
      <Text>Total Study Time</Text>
      <Metric>{Math.floor(totalDuration / 60)} minutes</Metric>
      <Divider />
      <Text>Total Flashcards Studied</Text>
      <Metric>{totalFlashcardsStudied}</Metric>
      <Divider />
      <Text>Total Study Sessions</Text>
      <Metric>{totalStudySessions}</Metric>
      <Divider />
      <Text>Average Study Duration</Text>
      <Metric>{(averageDuration / 60).toFixed(2)} minutes</Metric>
    </Card>
  );
};
