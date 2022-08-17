//import library
import React from 'react';

//import local components
import Tag from './Tag';

//import css
import './Card.css';

function AssignmentCard(props) {
  // console.log("inside card : ",props.assignment.staffTag.tagInfo);
  return (<>
    <div className="card forum-card">
      <div className="card-body">
        <Tag {...props.assignment.staffTag} />
        <div className="small-gap"></div>
        <h5 className="card-title">{props.assignment.topic}</h5>
      </div>
    </div>
  </>);
};

export default AssignmentCard;