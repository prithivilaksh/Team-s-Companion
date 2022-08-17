//import library
import React from 'react';

//import local components

//import css
import './Button.css';

function Button(props) {
  const buttonStyle = (props.text === "") ? "image-button-icon-only" : "image-button"
  return (<>
    <button className={"btn btn-outline-dark " + buttonStyle} onClick={props.event}>
      <img className="image-button-icon" alt={props.text} src={props.icon} />
      {props.text}
    </button>
  </>);
};

export default Button;