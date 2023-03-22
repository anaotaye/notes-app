import { React, useState, useEffect } from 'react';
import Note from '@/components/Note';
import CreateNote from './CreateNote';
import EditNote from './EditNote';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useRef } from 'react';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editNote, setEditNote] = useState(null);
  // const noteRef = useRef(provided.innerRef);

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // add new note to the state array
  const saveHandler = () => {
    setNotes((prev) => [
      ...prev,
      {
        id: uuid(),
        text: inputText,
      },
    ]);
    // clear the textarea
    setInputText('');
  };

  //delete note function
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  // set note to edit
  const editNoteHandler = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setEditNote(noteToEdit);
  };

  // update note
  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        note.text = updatedNote.text;
      }
      return note;
    });
    setNotes(updatedNotes);
    setEditNote(null);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  //saving data to local storage
  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(notes));
  }, [notes]);

  //get the saved notes and add them to the array
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Notes'));
    if (data) {
      setNotes(data);
    }
  }, []);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='list'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='m-auto flex flex-col md:flex-row gap-4 flex-wrap w-full px-5 pt-5 pb-10 list'
          >
            {notes.map((note) => (
              <Note
                key={note.id}
                id={note.id}
                text={note.text}
                deleteNote={deleteNote}
                editNoteHandler={editNoteHandler}
                updateNote={updateNote}
                updatedText={
                  editNote && editNote.id === note.id ? editNote.text : null
                }
              />
            ))}
            {provided.placeholder}
            {editNote ? (
              <EditNote
                id={editNote.id}
                text={editNote.text}
                updateNote={updateNote}
                setEditNote={setEditNote}
              />
            ) : (
              <CreateNote
                textHandler={textHandler}
                saveHandler={saveHandler}
                inputText={inputText}
              />
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Notes;
