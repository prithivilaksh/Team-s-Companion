//import library
import React, { useState } from 'react';

//import local components

//import css

function DatePicker(props) {
  let [error, setError] = useState(false);
  let property = props.property;
  let [value, setValue] = useState(props.getValue(property) || property.defValue);
  return (<>
    <div className="form-group">
      <div className='form-placeholder'>{property.placeholder || ""}<span className="form-star">{property.mandatory ? "*" : ""}</span></div>
      <input type="date" className="form-control date-picker" value={value} onChange={(e) => { props.setValue(property, e.target.value); setValue(e.target.value); }} onBlur={(e) => { setError(props.validate(property, e.target.value)); setValue(e.target.value); }} pattern="\d{4}-\d{2}-\d{2}" onKeyDown={(e) => e.preventDefault()} />
      <div className="form-error" style={{ display: (error ? "block" : "none") }}>{property.error || ""}</div>
    </div>
  </>);
};

export default DatePicker;