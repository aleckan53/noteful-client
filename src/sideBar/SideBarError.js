import React from 'react';

export default class MainSectionError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {      
      return <div style={{
        width: '30%',
        border: '1px solid black', 
        padding: '10px'
      }}>
        <h2>Something went wrong. Can't load folders list.</h2>
        <button>Contact support</button>
      </div>
    }
    return this.props.children;
  }  
}