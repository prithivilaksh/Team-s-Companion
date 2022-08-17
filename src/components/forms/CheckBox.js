//import library
import React, { useState } from 'react';

//import local components

//import css

function CheckBox(props) {
  let property = props.property;
  let [checked, setChecked] = useState(props.getValue(property) || property.defValue);
  let mark = checked ? { checked: true } : {};
  return (<>
    <div className="form-group">
      <div className="form-control-flex">
        <div className='form-placeholder'>{property.placeholder || ""}</div>
        <div className='round'
            onClick={(e) => { props.setValue(property, e.target.checked); setChecked(e.target.checked); }}
        >
          <input type="checkbox"
            {...mark} />
          <label for="checkbox"></label>
        </div>
      </div>
    </div>
  </>);
};

export default CheckBox;