import React from 'react';
import NotesContext from '../NotesContext';
import ValidationError from '../validationError';
import './addNote.css';
import uuid from 'uuid/v4';
import config from '../config'


export default class AddNote extends React.Component {
  static contextType = NotesContext;

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      nameValid: false,
      contentValid: false,
      formValid: false,
      validationMsg : {
        name: '',
        content: ''
      }
    }
  }

  updateName (name) {
    this.setState({
      name
    }, ()=>this.validateName(name))
  }

  updateContent (content) {
    this.setState({
      content
    }, ()=>this.validateContent(content))
  }

  validateName (value) {
    const fieldErrors = {...this.state.validationMsg};
    let hasError = false;

    if (value.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {
      if (value.length < 3) {
        fieldErrors.name = 'Must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false;
      }
    }
    this.setState({
      validationMsg: fieldErrors,
      nameValid: !hasError
    }, ()=>this.formValid())
  }

  validateContent(value) {
    const fieldErrors = {...this.state.validationMsg};
    let hasError = false;

    value = value.trim();
    if (value.length === 0) {
      fieldErrors.content = 'Text is required';
      hasError = true;
    } else {
      if (value.length < 3) {
        fieldErrors.content = 'Must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.content = '';
        hasError = false;
      }
    }
    this.setState({
      validationMsg: fieldErrors,
      contentValid: !hasError
    }, ()=>this.formValid())
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.contentValid
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    const id = uuid()
    const newNote = {
      id,
      title: e.target['note-name'].value,
      folder: e.target['note-folderId'].value,
      content: e.target['note-content'].value,
      date_created: new Date()
    }
    
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res=>{
        console.log(res);
        this.context.addNote(newNote);
        this.props.history.goBack();
      }) 
  }

  render(){
    return <>
      <nav>
        <button name="noteForm" onClick={()=>this.props.history.goBack()}>Close</button>
      </nav>
      <main>
        <form id="addNote" onSubmit={e=>this.handleSubmit(e)}>
          <div>
            <input type="text" name="note-name" id="noteName" onChange={e=>this.updateName(e.target.value)}/>
            <label htmlFor="noteName">Name</label>
            <ValidationError hasError={!this.state.nameValid} message={this.state.validationMsg.name}/>
          </div>
          <div>
            <textarea type="text-area" name="note-content" id="noteContent" onChange={e=>this.updateContent(e.target.value)}/>
            <label htmlFor="noteContent">Text</label>
            <ValidationError hasError={!this.state.contentValid} message={this.state.validationMsg.content}/>
          </div>
          <div>
            <select name="note-folderId" id="noteFolderId">
              <option value={null} disabled>--Select folder--</option>
              {this.context.folders.map((folder,i)=>
                <option value={folder.id} key={i}>{folder.title}</option>)}
            </select>
            <label htmlFor="noteContent">Select folder</label>
          </div>
          <input type="submit" disabled={!this.state.formValid}/>
        </form>
      </main>
    </>
  }
}

