//import library
import React from 'react';

//import local components

//import css
import './Card.css';

function CardList(props) {
  return (<>
    <div className='card-list'>
      {props.children}
    </div>
  </>);
};

export default CardList;