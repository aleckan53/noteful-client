import React, { Component } from 'react';
import './App.css';
import MainSection from './mainSection/mainSection';
import SideBar from './sideBar/sideBar';
import {Link, Route} from 'react-router-dom';
import NotesContext from './Context';
import AddNote from './addNote/addNote';
import MainSectionError from './mainSection/mainSectionError';
import SideBarError from './sideBar/SideBarError';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      folders: [],
      notes: [],
    }
  }

  static contextType = NotesContext;

  componentWillMount() {
    
    fetch('http://localhost:9090/db')
      .then(res => {
        if (!res.ok){
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(res => {
        this.setState({...res})
        this.context = this.state;
        console.log(this.context);
      })
      .catch(err => this.setState({err}))

  }

  deleteNote = (removedNoteId) => {
    const newNotes = this.state.notes.filter(note=>note.id !== removedNoteId);
    this.setState({
      notes: newNotes
    })
  }

  addNote = (newNote) => {
    this.setState({
      notes: [...this.state.notes, newNote]
    })
  }

  updateFolders = newFolder => {
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }

  renderRoutes = (component) => {
    const routes = ['/', '/folder/:folderId', '/note/:noteId']
    return routes.map((route,i) =>
      route !== '/'
      ? <Route path={route} key ={i} component={component}/>
      : <Route exact path={route} key ={i} component={component}/>
    )
  }

  render() {
    const contextValue = {
      ...this.state,
      deleteNote: this.deleteNote,
      updateFolders: this.updateFolders,
      addNote: this.addNote,
      toggleForm: this.toggleForm,
    }
    
    return <>
      <header className="Header">
        <Link to="/"><h1>Noteful</h1></Link>
      </header>
      <div className="App">
        <NotesContext.Provider value={contextValue}>
          <SideBarError>
            {this.renderRoutes(SideBar)}
          </SideBarError>
          <MainSectionError>
            {this.renderRoutes(MainSection)}
          </MainSectionError>
          <Route path={'/add-note'} component={AddNote}/>
        </NotesContext.Provider>
      </div>
    </>
  }
}

export default App;

