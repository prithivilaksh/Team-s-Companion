//import library
import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';

//import local components
import { authStatus, getQueryForAllAssignments, getQueryForAllEvents, getRecords, userProfile, getItemFilters, isAdmin,getQueryForAllEventsDay,unique } from '../library/FirebaseApp';
import { getCurrentDate,currentDay } from '../library/Database';
import { Carousel, CarouselItem } from '../components/cards/Carousel';
import Button from '../components/buttons/Button';
import AssignmentCard from '../components/cards/AssignmentCard';
import CardList from '../components/cards/CardList';
import EventCard from '../components/cards/EventCard';
import Tabs from '../components/tabs/Tabs';
import DatePicker from '../components/forms/DatePicker';

//import css

function CalendarScreen() {
  let [index, setIndex] = useState(0);
  let [date, setDate] = useState(getCurrentDate());
  let [carousels, setCarousels] = useState([]);
  let [events, setEvents] = useState([]);
  useEffect(() => {
    authStatus("/calendar");
    window.showNav("menu");
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.roomInfo && date) {
      getRecords(getQueryForAllAssignments(date, userProfile.roomInfo.id), (items, error) => {
        if (!error) {
          setCarousels(getItemFilters(items));
        }
      });
      // getRecords(getQueryForAllEvents(date, userProfile.roomInfo.id), (items, error) => {
      //   if (!error) {
      //     setEvents(getItemFilters([...events, ...items]));
      //   }
      // });
      // getRecords(getQueryForAllEventsDay(currentDay(), userProfile.roomInfo.id),
      //   (items, error) => {
      //     if (!error) {
      //       setEvents(getItemFilters([...events, ...items]));
      //     }
      //   }
      // );
        getRecords(getQueryForAllEvents(date, userProfile.roomInfo.id), (items, error) => {
        
        if (!error) {
          console.log("Events from fetch : ", items);
          getRecords(getQueryForAllEventsDay(currentDay(date), userProfile.roomInfo.id),
            (recurringItems, recurringError) => {
              console.log("calendar : ",items,recurringItems)
              if (!recurringError) {
                setEvents(getItemFilters(unique([...items, ...recurringItems])));
              } else {
                setEvents(getItemFilters(items));
              }
            }
          );
        }
        else {
          console.log("Error")
        }
      });


    }
  }, [date]);

  function validate(property, value) {
    return true;
  }

  function getValue(property) {
    return date;
  }

  function setValue(property, value) {
    setDate(value);
  }

  document.body.style.backgroundColor = "white";
  return (<>
    <Tabs />
    <div className='p-3 row'>
      <div className='w-50'>
        <DatePicker property={{ property: 'date' }} getValue={getValue} setValue={setValue} validate={validate} />
      </div>
      <div className='w-50'>
        <div className="form-group">
          <div className='d-flex'>
            <div className='w-50' style={{ display: (isAdmin()) ? "block" : "none" }}>
              <Button event={() => { navigate("/assignment") }} text="" icon="/asserts/images/icons/button/assignment.png" />
            </div>
            <div className='w-50' style={{ display: (isAdmin()) ? "block" : "none" }} >
              <Button event={() => { navigate ("/event") }} text="" icon="/asserts/images/icons/button/event.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CardList>
      {
        events.map((eventItem, ind) => {
          // console.log("Event : ",eventItem);
          return (<EventCard event={eventItem} index={ind} key={ind} />);
        })
      }
    </CardList>
    <br/>
    <br/>
    <Carousel updateChild={(index) => { setIndex(index); }} size={carousels.length}>
      {
        carousels.map((item, ind) => {
          // console.log("Assigment : ",item);
          return (
            <CarouselItem show={(index === ind)} key={ind}>
              <AssignmentCard assignment={item} index={ind} />
            </CarouselItem>
          );
        })
      }
    </Carousel>
  </>);
}

export default CalendarScreen;