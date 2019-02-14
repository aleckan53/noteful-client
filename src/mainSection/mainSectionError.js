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
      return <main style={{
        width: '70%',
        border: '1px solid black', 
        padding: '10px'
      }}>
        <h2>Something went wrong. Can't load notes</h2>
        <button>Contact support</button>
      </main>
    }
    return this.props.children;
  }  
}