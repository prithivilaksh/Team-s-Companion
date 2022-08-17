//import library
import React, { useState, useEffect } from 'react';

//import local components
import { getColor } from '../../library/Database';

//import css
import './Card.css';

function EventCard(props) {
  let [background, setBackground] = useState("#2596BE");
  useEffect(() => {
    if (props.index) {
      getColor(props.index, 2, (color) => {
        setBackground(color);
      });
    }
  }, []);
  return (<>
    <div className="event-card" style={{ background: background }}> {props.event.start} - {props.event.end} | {props.event.staffTag.name} </div>
  </>);
};

export default EventCard;