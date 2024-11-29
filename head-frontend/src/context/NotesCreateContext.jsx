import React, { createContext, useContext, useState } from 'react';
import NoteCreateUpdate from '../components/Notes/NoteCteateUpdate';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [note, setNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (params = {}) => {
    setNote((prevNote) => ({ ...prevNote, ...params }));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNote(null); 
  };

  return (
    <NoteContext.Provider value={{ openModal }}>
      {children}
      {isModalOpen && note && (
        <NoteCreateUpdate
          index={note.index}
          title={note.title}
          description={note.description}
          access={note.access}
          type={note.type}
          onClose={closeModal}
          updateNotes={() => note.updateNotes && note.updateNotes()}
        />
      )}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  return useContext(NoteContext);
};
