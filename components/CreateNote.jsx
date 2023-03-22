import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

function CreateNote({ textHandler, saveHandler, inputText }) {
  //character limit
  const charLimit = 100;
  const charLeft = charLimit - inputText.length;

  return (
    <div
      className='note filter bg-[rgba(255, 255, 255, 0.1)] shadow-xl rounded-xl min-h-[170px] break-words p-6'
      style={{ background: 'rgba(255, 255, 255, 0)' }}
    >
      <textarea
        value={inputText}
        placeholder='Type....'
        onChange={textHandler}
        maxLength='100'
        className='p-0 outline-none resize-none'
      ></textarea>
      <div className='flex items-center justify-between gap-3 mb-4 mt-5'>
        <span className='label'>{charLeft} characters left</span>
        <button
          className=' bg-gray-500 text-white transition-[0.1s] ease-in-out cursor-pointer hover:bg-white hover:text-gray-500 px-4 py-2 border rounded-lg'
          onClick={saveHandler}
        >
          Save
        </button>
      </div>
      <LinearProgress
        className='bg-black'
        variant='determinate'
        value={charLeft}
      />
    </div>
  );
}

export default CreateNote;
