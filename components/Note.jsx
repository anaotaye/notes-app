import Head from 'next/head';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditNote from './EditNote';

function Note({ id, text, updatedText, deleteNote, updateNote, index }) {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  if (editing) {
    return (
      <EditNote
        id={id}
        text={text}
        updateNote={updateNote}
        updatedText={updatedText}
        setEditing={setEditing}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Notes App</title>
        <meta name='description' content='Write down your thoughts.' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className='flex flex-col justify-between border rounded-xl shadow-xl pt-2 min-h-[170px] px-5 w-full md:w-96'
          >
            <div className='text-base flex-wrap'>{text}</div>
            <div className='flex gap-2 self-end mb-4'>
              <MdOutlineEdit
                className='text-lg cursor-pointer mr-3'
                onClick={handleEdit}
              />
              <MdOutlineDelete
                className='text-lg cursor-pointer'
                onClick={() => deleteNote(id)}
              />
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Note;
