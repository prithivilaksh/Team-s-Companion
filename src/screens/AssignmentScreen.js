//import library
import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

//import local components
import { authStatus, createItem, createRecord } from '../library/FirebaseApp';
import Form from '../components/forms/Form';

//import css

function AssignmentScreen() {
  useEffect(() => {
    authStatus("/assignment");
    window.showNav("back", "/calendar");
  }, []);

  function createAssignmentSubmit(object, form) {
    createRecord(createItem(form.table, object.id, object),
      (_, error) => {
        if (!error) {
          navigate("/calendar");
        }
      }
    );
  }

  document.body.style.backgroundColor = "white";
  return (<>
    <div className='screen-center'>
      <div className='container'>
        <Form id="createAssignment" submit={createAssignmentSubmit} />
      </div>
    </div>
  </>);
}

export default AssignmentScreen;