import React, { Component } from 'react';
import './App.css';
import MainSection from './mainSection/mainSection';
import SideBar from './sideBar/sideBar';
import {Link, Route} from 'react-router-dom';
import STORE from './store'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...STORE
    }
  }

  render() {
    
    return (
      <>
        <header className="Header">
          <Link to="/"><h1>Noteful</h1></Link>
        </header>

        <div className="App">
        <Route
          path ={`/folder/:folderId`}
          render={(routerProps)=>{
            return (
              <>
                <MainSection
                  notes={this.state.notes.filter(n => n.folderId === routerProps.match.params.folderId)}/>
                <SideBar 
                  folders={this.state.folders}/>
              </>
            )
          }}/>
        
        <Route
          path={`/note/:noteId`}
          render={(routerProps)=>{
            return (
              <>
                <MainSection
                  notes={this.state.notes.filter(n => n.id === routerProps.match.params.noteId)}/>
                <SideBar 
                  history={routerProps.history}
                  f={this.state.folders}
                  folders={
                    this.state.notes.filter(n => n.id === routerProps.match.params.noteId)
                  }/>
              </>
            )
          }}/>

        <Route
          exact path='/'
          render={()=>{
            return (
              <>
                <MainSection 
                  notes={this.state.notes}/>
                <SideBar 
                  folders={this.state.folders}/>
              </>
            )
          }}/>
        </div>
      </>
    );
  }
}

export default App;
