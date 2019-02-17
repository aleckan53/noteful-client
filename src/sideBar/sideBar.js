import React from 'react';
import './sideBar.css';
import {NavLink} from 'react-router-dom'; 
import NotesContext from '../Context';
import AddFolder from '../addFolder/addFolder';

export default class SideBar extends React.Component {
  static contextType = NotesContext;
  state = {
    folderForm: false
  }

  toggleForm (bool) {
    this.setState({
      folderForm: bool
    })
  }

  componentWillReceiveProps (){
    this.toggleForm(false)
  }

  render () {

    const { noteId } = this.props.match.params;
    const { folders, notes } = this.context;
    const note = notes.find(n=>n.id === noteId);
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
        {!this.state.folderForm 
          ? <button onClick={()=>this.setState({folderForm: true})}>Add folder</button>
          : <AddFolder toggleForm={()=>this.toggleForm(false)}/>}
        </ul>
      : <>
        <p>{folderName}</p>
        <button onClick={()=>this.props.history.goBack()}>Go Back</button>
        </>    
      }
    </nav>
  }
}