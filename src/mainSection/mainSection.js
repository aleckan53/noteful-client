import React from 'react';
import './mainSection.css';

import {NavLink} from 'react-router-dom';


export default function MainSection (props) {
    
  return(
    <main className="MainSection">
      {props.notes.map((n,i)=>
        <div 
          key={i}
          id={n.id}
          folderid={n.folderid}
          className="Note"> 
          <div>
            <NavLink to={`/note/${n.id}`}><h3>{n.name}</h3></NavLink>
            <p>Modified on: {new Date(n.modified).toLocaleDateString()}</p>
          </div>
          <button>Delete Note</button>
        </div>
      )}
      {props.notes.length>1 
        ? <button>Add note</button>
        : <p>{props.notes[0].content}</p>}
    </main>
  )
}
