import React from 'react';
import NotesContext from '../Context';
import ValidationError from '../validationError';

export default class AddFolder extends React.Component {
  static contextType = NotesContext;

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValid: false,
      formValid: false,
      validationMsg: {
        name: ''
      }
    }
  }

  updateName(value) {
    this.setState({
      name: value
    }, ()=>this.validateName(value))
  }

  validateName(value) {
    const fieldErrors = {...this.state.validationMsg};
    let hasError = false;

    value = value.trim();
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

  formValid() {
    this.setState({
      formValid: this.state.nameValid
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    
    const newFolder = {
      name: e.target['folder-name'].value,
      id: e.target['folder-name'].value+Math.floor(Math.random()*100000) //dummyId generator :)
    }

    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      body: JSON.stringify(newFolder),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(!res.ok) throw new Error(res.statusText);
        this.context.updateFolders(newFolder);
        this.context.toggleForm();
      })
  }

  render() {
    return <li>
      <form onSubmit={e=>this.handleSubmit(e)}>
        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMsg.name}/>
        <input type="text" name="folder-name" onChange={e=>this.updateName(e.target.value)}/>
        <input type="submit" disabled={!this.state.formValid}/>
        <button type="button" onClick={()=>this.context.toggleForm()}>Cancel</button>
      </form>
    </li>
  }
}

