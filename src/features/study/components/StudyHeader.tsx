import React from 'react';

export const StudyHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className='flex items-center justify-between max-w-7xl mx-auto p-4 w-full transition-all duration-500 ease-in-out bg-green-600 bg-opacity-40'>
      {children}
    </header>
  );
};

export const StudyHeading = () => {
  return <h1 className='font-bold text-3xl'>Study</h1>;
};
