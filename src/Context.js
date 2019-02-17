import React from 'react';

const NotesContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: ()=>{},
  addNote: ()=>{},
  updateFolders: ()=>{},
})

export default NotesContext;