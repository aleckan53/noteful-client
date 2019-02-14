import React from 'react';

export default function ValidationError(props) {
  if(props.hasError) {
    return (
      <div className="error" style={{
        fontSize: 13,
        color: 'red'
      }}>{props.message}</div>
    );
  }
  return <></>
}