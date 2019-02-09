import React from 'react';
import './sideBar.css'

import {NavLink} from 'react-router-dom'; 


export default function SideBar (props) {
  
  
  return(
    <aside className="SideBar">
      {props.folders.length>1 ?(
        <>
          <ul>
            {props.folders.map((folder, i) => 
              <NavLink to={`/folder/${folder.id}`} key={i}>
                <li 
                  id={folder.id}>
                  {folder.name}
                </li>
              </NavLink>
            )}
          </ul>
          <button>Add folder</button>
        </>
        ) : (
          <>
            <button onClick={()=>props.history.goBack()}>Go back</button>
            <p>{props.f.filter(folder=> folder.id === props.folders[0].folderId)[0].name}</p>
          </>
        )
      }
      
    </aside>
  )
}