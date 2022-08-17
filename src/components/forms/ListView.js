//import library
import React, { useState, useEffect } from 'react';

//import local components
import { getDropdownData } from '../../library/Database';

//import css

function ListView(props) {
  let property = props.property;
  let [selected, setSelected] = useState(props.getValue(property) || []);
  let [data, setData] = useState([]);
  useEffect(() => {
    //perform static or dynamic data mapper.
    getDropdownData(property, (items) => {
      setData(items);
    });
  }, []);

  function selectedItem(item) {
    let copy = [];
    if (find(item)) {
      copy = [...arrayRemove(selected, item)];
    } else {
      copy = [...selected, item];
    }
    setSelected(copy);
    props.setValue(property, copy);
  }

  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }

  function find(row) {
    for (let item of selected) {
      if (item.id === row.id) {
        return true;
      }
    }
    return false;
  }


  return (<>
    <div className="form-group">
      <div className='form-placeholder'>{property.placeholder || ""}</div>
      <div className="form-control">
        <div className='list-holder'>
          {
            data.map((row, index) => {
              const mark = find(row) ? { checked: true } : {};
              return (<div className='list-item' key={index}>
                <div className="form-control-flex"   >
                  <div>{row.name}</div>
                  <div className='round' onClick={(e) => { selectedItem(row); }}>
                    <input type="checkbox" {...mark} />
                    <label htmlFor="checkbox"></label>
                  </div>
                </div>
              </div>);
            })
          }
        </div>
      </div>
    </div>
  </>);
};

export default ListView;