//import library
import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

//import local components
import { authStatus, createRecord, getRecord, userProfile, createItem, isStaff } from '../library/FirebaseApp';
import { getRefreshPath, removeRefreshPath } from '../library/Database';
import Form from '../components/forms/Form';
import Button from '../components/buttons/Button';

//import css

function RoomScreen() {
  useEffect(() => {
    authStatus("/room", (status) => {
      if (status && userProfile.roomInfo) {
        isStaff((_, error) => {
          navigate((error) ? getRefreshPath() : "/forum");
          removeRefreshPath();
        });
      } else {
        removeRefreshPath();
      }
    });
    window.showNav("");
  }, []);

  function createRoomSubmit(object, form) {
    createRecord(createItem(form.table, object.id, object),
      (roomInfo, error) => {
        if (!error) {
          window.showAlert("Room Created.");
          userProfile.roomInfo = roomInfo;
          userProfile.type = 'Admin';
          createRecord(createItem('User', userProfile.id, userProfile),
            (_, error) => {
              if (!error) {
                navigate("/calendar");
              }
            }
          );
        };
      }
    );
  }

  function joinRoomSubmit(object, form) {
    getRecord('Room', object.id, (roomInfo, error) => {
      if (!error) {
        userProfile.roomInfo = roomInfo;
        createRecord(createItem(form.table, userProfile.id, userProfile),
          (_, error) => {
            if (!error) {
              navigate("/calendar");
              window.showAlert("Joined the room.");
            }
          }
        );
      };
    });
  }

  function buttonClick(name) {
    navigate('/room#' + name);
  }

  const hash = window.location.hash.replace('#', '');
  document.body.style.backgroundColor = "#55E6C1";
  window.showNav("");
  
  switch (hash) {
    case "createRoom":
      return (<>
        <div className='screen-center'>
          <div className='container'>
            <Form id="createRoom" submit={createRoomSubmit} />
          </div>
        </div>
      </>);
    case "joinRoom":
      return (<>
        <div className='screen-center'>
          <div className='container'>
            <Form id="joinRoom" submit={joinRoomSubmit} />
          </div>
        </div>
      </>);
    default:
      return (<>
        <div className='screen-center'>
          <div className='container'>
            <div className="room-button"><Button icon="/asserts/images/icons/button/create_room.png" text="Create Room" event={() => { buttonClick("createRoom"); }} /></div>
            <div className="room-button"><Button icon="/asserts/images/icons/button/join_room.png" text="Join Room" event={() => { buttonClick("joinRoom"); }} /></div>
          </div>
        </div>
      </>);
  }

}

export default RoomScreen;