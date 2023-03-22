import React, { useState } from 'react';

function EditNote({ id, text, updateNote, setEditing }) {
  const [updatedText, setUpdatedText] = useState(text);

  const handleTextChange = (e) => {
    setUpdatedText(e.target.value);
  };

  const handleSave = () => {
    updateNote({
      id: id,
      text: updatedText,
    });
    setEditing(false);

    updateNote({
      id: id,
      text: updatedText,
    });
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className='border rounded-xl shadow-xl pt-2 min-h-[170px] px-5 w-full md:w-[30%] lg:[20%] flex flex-col justify-between'>
      <textarea
        value={updatedText}
        onChange={handleTextChange}
        maxLength='100'
        placeholder='Type...'
        className='p-0 text-base flex-wrap outline-none resize-none'
      ></textarea>
      <div className='self-end mb-4'>
        <button
          className='bg-gray-500 text-white transition-[0.1s] ease-in-out cursor-pointer hover:bg-white hover:text-gray-500 px-4 py-2 border rounded-lg mr-2'
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className='bg-red-500 text-white transition-[0.1s] ease-in-out cursor-pointer hover:bg-white hover:text-gray-500 px-4 py-2 border rounded-lg'
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditNote;
