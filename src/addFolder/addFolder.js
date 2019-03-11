import React from 'react';
import NotesContext from '../NotesContext';
import ValidationError from '../validationError';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import config from '../config';

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
    const id = uuid();

    const newFolder = {
      id,
      title: this.state.name,
    }

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(newFolder),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        this.context.updateFolders(newFolder);
      })
  }

  render() {
    return <li>
      <form onSubmit={e=>this.handleSubmit(e)}>
        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMsg.name}/>
        <input type="text" name="folder-name" onChange={e=>this.updateName(e.target.value)}/>
        <input type="submit" disabled={!this.state.formValid}/>
        <button type="button" onClick={()=>this.props.toggleForm()}>Cancel</button>
      </form>
    </li>
  }
}

AddFolder.propTypes = {
  toggleForm: PropTypes.func
}