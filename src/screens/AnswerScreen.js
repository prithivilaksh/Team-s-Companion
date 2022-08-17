//import library
import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

//import local components
import { authStatus, createItem, createRecord } from '../library/FirebaseApp';
import Form from '../components/forms/Form';

//import css

function AnswerScreen(props) {
  useEffect(() => {
    authStatus("/answer/" + props.qid);
    window.showNav("back", "/forum");
  }, []);

  function createAnswerSubmit(object, form) {
    object.qid = props.qid;
    object.qType = "A";
    object.timeStamp = Date.now();
    createRecord(createItem(form.table, object.id, object),
      (_, error) => {
        if (!error) {
          navigate("/detail/" + props.qid);
        }
      }
    );
  }
  console.log(props.qid);
  document.body.style.backgroundColor = "white";
  return (<>
    <div className='screen-center'>
      <div className='container'>
        <Form id="createAnswer" submit={createAnswerSubmit} />
      </div>
    </div>
  </>);
}

export default AnswerScreen;