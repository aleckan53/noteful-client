import React from 'react';
import './sideBar.css';
import {NavLink} from 'react-router-dom'; 
import NotesContext from '../Context';
import AddFolder from '../addFolder/addFolder';

export default class SideBar extends React.Component {
  static contextType = NotesContext;

  render () {
    const location = this.props.history.location.pathname;
    
    const { noteId } = this.props.match.params;
    const { folders, notes } = this.context;
    const note = !notes.length
      ? ''
      : notes.find(n=>n.id === noteId);
    const folderName = !note  
      ? ''
      : folders.find(f=>f.id === note.folderId).name;

    return <nav className="SideBar">
      {!noteId
      ? <ul>
          {folders.map((f,i)=>
            <NavLink className="folder" to={`/folder/${f.id}`} key={i}>
              {<li id={f.id}>{f.name}</li>}
            </NavLink>
          )}
        {!this.context.folderForm 
          ? <button onClick={()=>this.context.toggleForm()}>Add folder</button>
          : <AddFolder/>}
        </ul>
      : <>
        <p>{folderName}</p>
        <button onClick={()=>this.props.history.goBack()}>Go Back</button>
        </>    
      }
    </nav>
  }
}