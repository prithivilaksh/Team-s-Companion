//import library
import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

//import local components
import { authStatus, createItem, createRecord } from '../library/FirebaseApp';
import Form from '../components/forms/Form';

//import css

function EventScreen() {
  useEffect(() => {
    authStatus("/event");
    window.showNav("back", "/calendar");
  }, []);

  function createEventSubmit(object, form) {
    createRecord(createItem(form.table, object.id, object),
      (_, error) => {
        if (!error) {
          navigate("/calendar");
        }
      }
    );
  }

  return (<>
    <div className='screen-center'>
      <div className='container'>
        <Form id="createEvent" submit={createEventSubmit} />
      </div>
    </div>
  </>);
}

export default EventScreen;