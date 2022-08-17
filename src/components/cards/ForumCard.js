//import library
import React from 'react';
import { navigate } from '@reach/router';

//import local components
import Tag from './Tag';

//import css
import './Card.css';

function ForumCard(props) {
  return (<>
    <div className="card forum-card"  onClick={() => { navigate("/detail/" + props.forum.qid); }}>
      <div className="card-body">
        <Tag {...props.forum.tagInfo} />
        <div className="small-gap"></div>
        <h5 className="card-title">{props.forum.title}</h5>
      </div>
    </div>
  </>);
};

export default ForumCard;