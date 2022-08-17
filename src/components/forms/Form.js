//import library
import React, { useEffect, useState } from 'react';

//import local components
import { getFormById, getNewObject } from '../../library/Database';
import FormElement from './FormElement';

//import css
import './Form.css';

function Form(props) {
  let [form, setForm] = useState();
  let [object, setObject] = useState();
  useEffect(() => {
    if (props.id) {
      const lForm = getFormById(props.id);
      setForm(getFormById(props.id));
       if (props.object) {
        setObject(props.object);
      } else {
        getNewObject(lForm, (object) => {
          setObject(object);
        });
      }
    }
  }, []);

  // useEffect(() => {
   
  // }, [form]);

  function submit() {
    props.submit(object, form);
    getNewObject(form, (object) => {
          setObject(object);
    });
  }

  function validate(property, value) {
    if (property.mandatory) {
      let regex = new RegExp(property.validate);
      return regex.test(value);
    }
    return true;
  }

  function getValue(property) {
    return property.property.split('.').reduce(function (prev, curr) {
      return prev ? prev[curr] : null;
    }, object);
  }

  function setValue(property, value) {
    object[property.property] = value;
    setObject(object);
  }

  if (form) {
    return (<>
      <div className='form-holder'>
        <h3>{form.name}</h3>
        <form onSubmit={(e) => { e.preventDefault();}}>
          <div className='form-elements'>
            {
              form.properties.map((property, index) => {
                return <FormElement property={property} key={index} getValue={getValue} setValue={setValue} validate={validate} />
              })
            }
          </div>
          <div className='form-actions'>
            <div><button className='form-btn' onClick={submit}>{form.action}</button></div>
          </div>
        </form>
      </div>
    </>);
  } else {
    return (<></>);
  }
};

export default Form;