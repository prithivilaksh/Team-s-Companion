//import library
import React, { useState, useEffect } from 'react';

//import local components
import { authStatus, createRecord, createItem, getEmailAsID, getRecords, isAdmin, userProfile, getQueryForAllStaffTags, getQueryForAllStaffs, getQueryForAllSubjects, unique } from '../library/FirebaseApp';
import Tabs from '../components/tabs/Tabs';
import Form from '../components/forms/Form';

//import css

function AdminScreen(props) {

  let [data, setData] = useState([]);

  useEffect(() => {
    authStatus((isAdmin()) ? "/admin/" + props.tab : "/calendar");
    window.showNav("back", "/calendar");
    if (userProfile.roomInfo && userProfile.roomInfo.id) {
      if (props.tab === "staff") {
        getRecords(getQueryForAllStaffs(userProfile.roomInfo.id), (items, error) => {
          if (!error) {
            let list = [];
            for (let item of items) {
              // console.log(item);
              list.push(item.staffInfo);
            }
            console.log(list);
            setData(list);
          }
        });
      } else if (props.tab === "tag") {
        getRecords(getQueryForAllStaffTags(userProfile.roomInfo.id), (items, error) => {
          if (!error) {
            console.log(items);

            setData(items);
          }
        });
      } else if (props.tab === "subject") {
        getRecords(getQueryForAllSubjects(userProfile.roomInfo.id), (items, error) => {
          if (!error) {
            setData(items);
          }
        });
      }
    }
  }, [props.tab]);

  function createSubmit(object, form) {
    if (props.tab === "staff") {
      object.id = getEmailAsID(object.email);
      createRecord(createItem(form.table, object.id, object),
        (item, error) => {
          if (!error) {
            // data.push({
            //   id: item.id,
            //   name: item.name
            // });
            setData([...data,{
              id: item.id,
              name: item.name
            }]);
            // setData(data);
          }
        }
      );
      let staffRoom = {
        id: userProfile.roomInfo.id + "-" + object.id,
        staffInfo: {
          id: object.id,
          name: object.name
        },
        roomInfo: userProfile.roomInfo
      };
      createRecord(createItem("StaffRoom", staffRoom.id, staffRoom))
    } else if (props.tab === "tag") {
      let records = [];
      for (let staff of object.staffInfo) {
        records.push(
          {
            id: object.tagInfo.id + "-" + staff.id,
            name: object.tagInfo.name + " - " + staff.name,
            staffInfo: staff,
            tagInfo: object.tagInfo,
            roomInfo: userProfile.roomInfo
          }
        );
      }
      for (let record of records) {
        createRecord(createItem(form.table, record.id, record),
          (item, error) => {
            if (!error) {
              // data.push(item);
              // setData(data);

            }
          }
        );
      }
      console.log(records);
      setData(unique([...data,records]));

    } else if (props.tab === "subject") {
      createRecord(createItem(form.table, object.id, object),
        (item, error) => {
          if (!error) {
            // data.push(item);
            setData([...data,item]);
          }
        }
      );
    }
  }

  let formName = "createStaff";
  if (props.tab === "subject") {
    formName = "createTag";
  } else if (props.tab === "tag") {
    formName = "createStaffTag";
  }
  document.body.style.backgroundColor = "white";
  return (<>
    <Tabs admin={true} />
    <div className='screen-center-admin'>
      <div className='container'>
        <Form id={formName} submit={createSubmit} />
      </div>
      <div className='container'>
        <div className='data-list-holder'>
          {
            data.map((item, index) => {
              return (
                <div className='data-list-item' key={index}>
                  {item.name}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  </>);
}

export default AdminScreen;
