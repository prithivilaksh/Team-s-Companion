//import library
import React, { useEffect,useState } from 'react';

//import local components
import { authStatus, userProfile, createRecord, createItem,unique } from '../library/FirebaseApp';
import Form from '../components/forms/Form';

//import css

function ProfileScreen() {
  let [count, setCount] = useState(0);
  useEffect(() => {
    authStatus("/profile");
    window.showNav("back", "/calendar");
  }, []);

  function addTagSubmit(object, form) {
    userProfile.staffTagList = unique([...userProfile.staffTagList, object.staffTagList]);
    createRecord(createItem(form.table, userProfile.id, userProfile));
    setCount(count + 1);
  }

  document.body.style.backgroundColor = "white";
  return (<>
    <div className='screen-center-admin'>
      <div className='container'>
        <Form id="userTag" submit={addTagSubmit} />
      </div>
      <div className='container'>
        <div className='data-list-holder'>
          {
            userProfile.staffTagList.map((staffTag, index) => {
              return (
                <div className='data-list-item' key={index}>
                  {staffTag.name}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  </>);
}

export default ProfileScreen;