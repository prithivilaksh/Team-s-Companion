//import library
import React from 'react'

//import local components
import Screen from './screens/Screen';
import { setRefreshPath } from './library/Database';
//import css
import './App.css';


function App() {
  setRefreshPath(window.location.pathname);
  return (<>
    <div className="App">
      <Screen />
    </div>
  </>);
}

export default App;
