//import library
import React from 'react';

//import local components
import TextField from './TextField';
import Hidden from './Hidden';
import CheckBox from './CheckBox';
import DatePicker from './DatePicker';
import ListView from './ListView';
import QuillEditor from './QuillEditor';
import DropDown from './DropDown';

//import css

function FormElement(props) {
  switch (props.property.view) {
    case "Hidden":
      return (<>
        <Hidden property={props.property} getValue={props.getValue} setValue={props.setValue} validate={props.validate} />
      </>);
    case "TextField":
      return (<>
        <TextField property={props.property} getValue={props.getValue} setValue={props.setValue} validate={props.validate} />
      </>);
    case "CheckBox":
      return (<>
        <CheckBox property={props.property} getValue={props.getValue} setValue={props.setValue} validate={props.validate} />
      </>);
    case "DatePicker":
      return (<>
        <DatePicker property={props.property} getValue={props.getValue} setValue={props.setValue} validate={props.validate} />
      </>)
    case "ListView":
      return (<>
        <ListView property={props.property} getValue={props.getValue} setValue={props.setValue} validate={props.validate} />
      </>)
    case "QuillEditor":
      return (<>
        <QuillEditor property={props.property} getValue={props.getValue} setValue={props.setValue} validate={props.validate} />
      </>);
    case "DropDown":
      return (<>
        <DropDown property={props.property} getValue={props.getValue} setValue={props.setValue} validate={props.validate} />
      </>);
    default:
      return (<></>);
  }
};

export default FormElement;