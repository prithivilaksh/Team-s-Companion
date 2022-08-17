//import library
import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

//import local components
import { authStatus, createItem, createRecord } from '../library/FirebaseApp';
import Form from '../components/forms/Form';

//import css

function StaffScreen() {
  useEffect(() => {
    authStatus("/staff");
    window.showNav("back", "/admin");
  }, []);

  function createStaffSubmit(object, form) {
    createRecord(createItem(form.table, object.id, object),
      (_, error) => {
        if (!error) {
          navigate("/admin");
        }
      }
    );
  }

  document.body.style.backgroundColor = "white";
  return (<>
    <div className='screen-center'>
      <div className='container'>
        <Form id="createStaff" submit={createStaffSubmit} />
      </div>
    </div>
  </>);
}

export default StaffScreen;