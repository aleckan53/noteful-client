import React from 'react';
import './mainSection.css';
import { NavLink, Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import config from '../config';

export default class MainSection extends React.Component {
  static contextType = NotesContext;

  state = {
    addNote: false
  }

  handleDelete = (e) => {
    e.preventDefault();
    const noteId = e.target.parentNode.id;
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'}
    })
      .then(res=> {
        if (!res.ok) {
          return res.json().then(error=>Promise.reject(error))
        }
      })
      .then(() => {
        this.context.deleteNote(noteId);
      })
      .catch(err=>console.log(err))
  }

  render(){
    const { folderId, noteId } = this.props.match.params;
    const notes = 
      !noteId && !folderId
        ? this.context.notes
        : this.context.notes.filter(n=>String(n.folder) === folderId || String(n.id) === noteId)
      
    return <main className="MainSection">
      {notes.map((n,i)=> 
        <div 
          key={i}
          id={n.id}
          folderid={n.folderId}
          className="Note"> 
          <div>
            <NavLink to={`/note/${n.id}`}><h3>{n.title}</h3></NavLink>
            <p>Modified on: {new Date(n.date_created).toLocaleDateString()}</p>
          </div>
          <button onClick={this.handleDelete}>Delete Note</button>
        </div>)}
      {notes.length === 1 && noteId
        ? <p>{notes[0].content}</p>
        : <Link to="/add-note">
            <button>Add note</button>
          </Link>} 
    </main>
  }
}
