import Notes from '@/components/Notes';
import React from 'react';

export default function Index() {
  return (
    <div className='overflow-y-auto md:overflow-hidden'>
      <h1 className='font-bold text-2xl mb-3 p-5'>Notes</h1>
      <div>
        <Notes />
      </div>
    </div>
  );
}
