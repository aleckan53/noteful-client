import React from 'react';

const NotesContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: ()=>{},
  addNote: ()=>{},
  updateFolders: ()=>{},
  toggleForm: ()=>{},
  folderForm: false,
})

export default NotesContext;