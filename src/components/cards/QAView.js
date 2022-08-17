//import library
import React from 'react';

//import local components

//import css
import './Card.css';

function QAView(props) {
  return (<>
    <div className='qa-holder'>
      <div className='qa-title'>
        {props.forum.title || ""}
      </div>
      <div className='qa-content'>
        <div dangerouslySetInnerHTML={{ __html: props.forum.content }} >
        </div>
      </div>
    </div>   
  </>);
};

export default QAView;