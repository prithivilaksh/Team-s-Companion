//import library
import React, { useState } from 'react';
import ReactQuill from 'react-quill';

//import local components

//import css
import 'react-quill/dist/quill.snow.css';

function QuillEditor(props) {
  let [error, setError] = useState(false);
  let property = props.property;
  let [value, setValue] = useState(props.getValue(property) || property.defValue);
  let modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['image'],
      ]
    },
    clipboard: {
      matchVisual: false,
    },
  };
  let formats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "image"
  ];
  return (<>
    <div className="form-group">
      <div className='form-placeholder'>{property.placeholder || ""}<span className="form-star">{property.mandatory ? "*" : ""}</span></div>
      <div
        style={{height:"30vh"}}
      >
        <ReactQuill value={value}
        onChange={(value) => { props.setValue(property, value); setValue(value); }}
        theme='snow'
        modules={modules}
        formats={formats} onBlur={() => { setError(props.validate(property, value)); }}
        style={{height:"25vh"}}
        />
      </div>
      <div className="form-error" style={{ display: (error ? "block" : "none") }}>{property.error || ""}</div>
    </div>
  </>);
};

export default QuillEditor;