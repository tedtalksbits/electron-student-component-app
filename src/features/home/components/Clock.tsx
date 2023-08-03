import React from 'react';

export const Clock = () => {
  const [time, setTime] = React.useState(new Date());
  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return (
    <div>
      {time.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })}
    </div>
  );
};
