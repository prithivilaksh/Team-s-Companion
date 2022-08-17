//import library
import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';

//import local components
import { getTabs, getAdminTabs } from '../../library/Database';

//import css
import './Tabs.css';

function Tabs(props) {
  let [data, setData] = useState([]);
  useEffect(() => {
    if (props.admin) {
      getAdminTabs((items) => {
        setData(items);
      });
    } else {
      getTabs((items) => {
        setData(items);
      });
    }
  }, []);

  function action(tab) {
    if (tab) {
      navigate(tab.link);
    }
  }
  const url = window.location.pathname;
  return (<>
    <div className='tab-bar'>
      {
        data.map((tab, index) => {
          let active = (url === tab.link) ? "active" : "";
          return (<div key={index}><div className={'tab ' + active} onClick={(e) => { action(tab); }}>{tab.name}</div></div>);
        })
      }
    </div>
  </>);
};

export default Tabs;
