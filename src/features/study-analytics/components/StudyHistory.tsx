import { StudySession } from '@/features/study/types';
import { Card, Title, Text, Metric, Divider } from '@tremor/react';
type StudyHistoryProps = {
  studySessions: StudySession[];
};
export const StudyHistory = ({ studySessions }: StudyHistoryProps) => {
  const lastStudySession = studySessions.sort((a, b) => {
    return new Date(a.end_time).getTime() - new Date(b.end_time).getTime();
  })[studySessions.length - 1];

  return (
    <Card>
      <Title>Study History</Title>
      <Text>Last Study Session</Text>
      {lastStudySession?.id}
      <Metric>
        {lastStudySession?.end_time.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        })}
      </Metric>
      <Divider />
      <Text>Flashcards Studied</Text>
      <Metric>{lastStudySession?.flashcards_studied}</Metric>
      <Divider />
      <Text>Time Spent Studying</Text>
      <Metric>
        {(lastStudySession?.duration_sec / 60).toFixed(2)} minutes
      </Metric>
    </Card>
  );
};
