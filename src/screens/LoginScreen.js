//import library
import React, { useEffect } from 'react';

//import local components
import { authStatus, signInWithGmail } from '../library/FirebaseApp';
import Button from '../components/buttons/Button';

//import css

function LoginScreen() {
  useEffect(() => {
    authStatus("/room");
    window.showNav("");
  }, []);

  function login() {
    signInWithGmail("/room");
  }
  document.body.style.backgroundColor = "#EAB543";
  return (<>
    <div className='screen-center'>
      <Button icon="/asserts/images/icons/button/google.webp" text="Signin with Google" event={login} />
    </div>
  </>);
}

export default LoginScreen;