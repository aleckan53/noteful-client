import React from 'react';
import './mainSection.css';
import { NavLink, Link } from 'react-router-dom';
import NotesContext from '../Context';

export default class MainSection extends React.Component {
  static contextType = NotesContext;

  state = {
    addNote: false
  }

  handleDelete = (e) => {
    e.preventDefault();
    const noteId = e.target.parentNode.id;

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'}
    })
      .then(res=> {
        if (!res.ok) throw new Error(res.statusText)
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
        : this.context.notes.filter(n=>n.folderId === folderId || n.id === noteId)
    
    return <main className="MainSection">
      {notes.map((n,i)=> 
        <div 
          key={i}
          id={n.id}
          folderid={n.folderid}
          className="Note"> 
          <div>
            <NavLink to={`/note/${n.id}`}><h3>{n.name}</h3></NavLink>
            <p>Modified on: {new Date(n.modified).toLocaleDateString()}</p>
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
