//import library
import React, { useEffect, useState } from 'react';

//import local components
import { getDropdownData } from '../../library/Database';

//import css

function DropDown(props) {
  let property = props.property;
  let [selected, setSelected] = useState(null);


  // let [selected, setSelected] = useState(props.getValue(property));

  let [data, setData] = useState([]);
  useEffect(() => {
    //perform static or dynamic data mapper.
    getDropdownData(property, (items) => {
      setData(items);
      if (selected == null && items[0]) {
        setSelected(items[0]);
        props.setValue(property, items[0]);
      }
    });
  }, []);


  function onDropdownSelect(index) {
    let row = data[index];
    props.setValue(property, row);
    setSelected(row); 
  } 
  
  return (<>
    <div className="form-group">
      <div className='form-placeholder'>{property.placeholder || ""}</div>
      <select aria-label={property.property} className='custom-dropdown' onChange={(e) => { onDropdownSelect(e.target.selectedIndex); }}>
        {
          data.map((row, index) => {
            const mark = (selected && row.id === selected.id) ? { value: true } : {};
            return <option value={row.id} key={index} {...mark}>{row.name}</option>
          })
        }
      </select>
    </div>
  </>);
};

export default DropDown;