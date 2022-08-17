//import library
import React from 'react';

//import local components

//import css
import './Alert.css';

function Alert(props) {
  return (<>
    <div className={(props.show) ? "app-alert show" : "app-alert"}>
      <div className='alert-message' >
        {props.message}
      </div>
    </div>
  </>);
};

export default Alert;