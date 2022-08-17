//import library
import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

//import local components
import { authStatus, createItem, createRecord } from '../library/FirebaseApp';
import Form from '../components/forms/Form';

//import css

function QuestionScreen() {
  useEffect(() => {
    authStatus("/question");
    window.showNav("back", "/forum");
  }, []);

  function createQuestionSubmit(object, form) {
    object.qid = object.id;
    object.qType = "Q";
    object.timeStamp = Date.now();

    createRecord(createItem(form.table, object.id, object),
      (_, error) => {
        if (!error) {
          navigate("/forum");
        }
      }
    );
  }

  document.body.style.backgroundColor = "white";
  return (<>
    <div className='screen-center'>
      <div className='container'>
        <Form id="createQuestion" submit={createQuestionSubmit} />
      </div>
    </div>
  </>);
}

export default QuestionScreen;