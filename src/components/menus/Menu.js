//import library
import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';

//import local components
import { isUserLogin, authStatus, signOutGmail, userProfile, isAdmin, leaveRoom } from '../../library/FirebaseApp';

//import css
import './Menu.css';

function NavigationBar(props) {
  let [login, setLogin] = useState(isUserLogin);
  let [roomId, setRoomId] = useState("");

  useEffect(() => {
    authStatus("", (status) => {
      setLogin(status);
      if (status && userProfile.roomInfo) {
        setRoomId(userProfile.roomInfo.id || "");
      }
    });
  }, []);

  const openNav = () => {
    document.querySelector(".side-bar").style.display = "block";
  }
  const closeNav = () => {
    document.querySelector(".side-bar").style.display = "none";
  }

  let icon = "";
  let classType = "nav-bar-transparent";
  let classTitleType = "";
  let action = () => { };
  if (!login) {
    icon = "/asserts/images/icons/menu/slash.png";
  } else {
    if (props.type === 'menu') {
      classType = "nav-bar-color"
      action = openNav;
      classTitleType = "nav-title-hidden";
      icon = "/asserts/images/icons/menu/menu.png";
    } else if (props.type === 'back') {
      classType = "nav-bar-color"
      classTitleType = "nav-title-hidden";
      action = () => { navigate(props.url) };
      icon = "/asserts/images/icons/menu/back.png";
    } else {
      icon = "/asserts/images/icons/menu/slash.png";
    }
  }

  return (<>
    <div className={'nav-bar ' + classType}>
      <div className='nav-icon'>
        <span onClick={action}>
          <img alt="NavIcon" src={icon} />
        </span>
      </div>
      <div className={'nav-title ' + classTitleType} >
        <span>Teams Companion</span>
      </div>
    </div>
    <div className="side-bar">
      <ul className='side-menu-bar'>
        <li className="closebtn" onClick={closeNav}>&times;</li>
        <li>Room ID: {roomId}</li>
        <li style={{ display: (isAdmin()) ? "block" : "none" }} onClick={e => { navigate("/admin/staff"); closeNav(); }}>Admin</li>
        <li onClick={e => { navigate("/profile"); closeNav(); }}>Profile</li>
        <li onClick={e => { leaveRoom(); closeNav(); }}>Leave Room</li>
        <li onClick={e => { signOutGmail(); closeNav(); }}>SignOut</li>
      </ul>
    </div>
  </>);
};

export default NavigationBar;