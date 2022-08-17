//import library
import React, { useState, useEffect } from 'react';

//import local components
import { getColorTag } from '../../library/Database';

//import css
import './Card.css';

function Tag(props) {
  let [background, setBackground] = useState("#2596BE");
  useEffect(() => {
     getColorTag(props.id,(color) => {
        setBackground(color);
      });
  }, []);
  return (<>
    <span className='super-tag' style={{ background: background }}>{props.name}</span>
  </>);
};

export default Tag;

/**
 function TagGenerator(props) {
    let tagStyle = {
    minWidth: "6rem",
    color: props.textColor,
    fontWeight:"400",
    backgroundColor: props.bgColor,
    padding: ".3em .3em",
    lineHeight: "1",
    whiteSpace: "nowrap",
    textDecoration: "none",
    textAlign: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "3px",
    borderColor: "#00000000",
    fontSize: "0.74em",
    position: "absolute",
    top: "0px",
    right: "0px"
  }
  return (
    
    <>
      <span style={tagStyle}>{props.text}</span>
    </>
  )
}
export default TagGenerator;
 */