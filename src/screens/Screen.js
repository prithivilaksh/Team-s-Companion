//import library
import React, { useEffect, useState } from 'react';
import { Redirect, Router } from '@reach/router';

//import local components
import { authStatus } from '../library/FirebaseApp';
import AdminScreen from './AdminScreen';
import AssignmentScreen from './AssignmentScreen';
import CalendarScreen from './CalendarScreen';
import DetailAnswerScreen from './DetailAnswerScreen';
import EventScreen from './EventScreen';
import ForumScreen from './ForumScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import QuestionScreen from './QuestionScreen';
import RoomScreen from './RoomScreen';
import AnswerScreen from './AnswerScreen';
import NavigationBar from '../components/menus/Menu';
import Alert from '../components/alert/Alert';

//import css
import './Screen.css';
import StaffScreen from './StaffScreen';
import SubjectScreen from './SubjectScreen';

function Screen() {
  let [alert, setAlert] = useState({ message: "", show: false });
  let [navigator, setNavigator] = useState({ type: "", url: "#" });
  useEffect(() => {
    authStatus("/room");
  }, []);
  window.showAlert = function (msg) {
    if (msg) {
      setAlert({ message: msg, show: true });
      setTimeout(function () { setAlert({ message: "", show: false }); }, 3000);
    }
  };
  window.showNav = function (type, url) {
    if (type) {
      setNavigator({ type: type, url: url });
    }
  };
  return (<>
    <div className='screen'>
      <NavigationBar type={navigator.type} url={navigator.url} />
      <Router>
        <Redirect from="/admin" to="/admin/staff" />
        <AdminScreen tab='staff' path='/admin/staff' />
        <AdminScreen tab='subject' path='/admin/subject' />
        <AdminScreen tab='tag' path='/admin/tag' />
        <AssignmentScreen path='/assignment' />
        <CalendarScreen path='/calendar' />
        <DetailAnswerScreen path='/detail/:qid' />
        <EventScreen path='/event' />
        <ForumScreen path='/forum' />
        <LoginScreen path='/login' />
        <LoginScreen path='/' />
        <ProfileScreen path='/profile' />
        <QuestionScreen path='/question' />
        <AnswerScreen path='/answer/:qid' />
        <StaffScreen path='/staff' />
        <SubjectScreen path='/tag' />
        <RoomScreen path='/room' />
      </Router>
      <Alert message={alert.message} show={alert.show} />
    </div>
  </>);
}

export default Screen;

