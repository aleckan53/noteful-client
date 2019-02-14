import React from 'react';
import NotesContext from '../Context';
import ValidationError from '../validationError';
import './addNote.css'

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
    const newNote = {
      id: e.target['note-name'].value+Math.floor(Math.random()*100000), //dummyId generator :)
      name: e.target['note-name'].value,
      modified: new Date(),
      folderId: e.target['note-folderId'].value,
      content: e.target['note-content'].value
    }
    
    fetch(`http://localhost:9090/notes`, {
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
            <ValidationError hasError={!this.state.nameValid} message={this.state.validationMsg.name}/>
            <input type="text" name="note-name" id="noteName" onChange={e=>this.updateName(e.target.value)}/>
            <label htmlFor="noteName">Name</label>
          </div>
          <div>
            <ValidationError hasError={!this.state.contentValid} message={this.state.validationMsg.content}/>
            <textarea type="text-area" name="note-content" id="noteContent" onChange={e=>this.updateContent(e.target.value)}/>
            <label htmlFor="noteContent">Text</label>
          </div>
          <div>
            <select name="note-folderId" id="noteFolderId">
              <option value={null} disabled>--Select folder--</option>
              {this.context.folders.map((folder,i)=>
                <option value={folder.id} key={i}>{folder.name}</option>)}
            </select>
            <label htmlFor="noteContent">Select folder</label>
          </div>
          <input type="submit" disabled={!this.state.formValid}/>
        </form>
      </main>
    </>
  }
}

