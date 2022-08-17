//import library
import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';

//import local components
import { authStatus, getQueryForAllQuestion, getRecords, isStaff, userProfile } from '../library/FirebaseApp';
import Tabs from '../components/tabs/Tabs';
import CardList from '../components/cards/CardList';
import ForumCard from '../components/cards/ForumCard';

//import css

function ForumScreen() {
  let [questions, setQuestions] = useState([]);
  let [staff, setStaff] = useState(false);
  useEffect(() => {
    authStatus("/forum");
    window.showNav("menu");
    getRecords(getQueryForAllQuestion(userProfile.roomInfo.id), (items, error) => {
      if (!error) {
        // console.log(items);
        setQuestions(items);
      }
    });
    isStaff((_, error) => {
      if (!error) {
        setStaff(true);
      }
    });
  }, []);
  document.body.style.backgroundColor = "white";
  return (<>
    {(staff) ? (<></>) : (<Tabs />)}
    <CardList>
      {
        questions.map((question, index) => {
          // console.log("Ques : ", question);
          return (<ForumCard forum={question} key={index} />);
        })
      }
    </CardList>
    <button type="button" className="round-floating-button" onClick={() => { navigate("/question") }}>
      <img width="35px" alt="Ask Question" src="/asserts/images/icons/askQues.png" />
    </button>
  </>);
}

export default ForumScreen;