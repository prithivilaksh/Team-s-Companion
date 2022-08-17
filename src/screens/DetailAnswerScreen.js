//import library
import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';

//import local components
import { authStatus, getQueryForQuestionAndAnswers, getRecords } from '../library/FirebaseApp';
import CardList from '../components/cards/CardList';
import QAView from '../components/cards/QAView';


//import css

function DetailAnswerScreen(props) {
  let [forums, setForums] = useState([]);
  useEffect(() => {
    authStatus("/detail/" + props.qid);
    window.showNav("back", "/forum");
    getRecords(getQueryForQuestionAndAnswers(props.qid), (items, error) => {
      if (!error) {
        setForums(items);
      }
    });
  }, []);

  document.body.style.backgroundColor = "white";
  return (<>
    <CardList>
      {
        forums.map((forum, index) => {
          return (<QAView forum={forum} key={index} />);
        })
      }
    </CardList>
     <button type="button" className="round-floating-button" onClick={() => { navigate("/answer/"+props.qid) }}>
      <img width="35px" alt="Ask Question" src="/asserts/images/icons/postAns.png" />
    </button>
  </>);
}

export default DetailAnswerScreen;