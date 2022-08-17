//import library
import React, { useEffect, useState } from 'react';

//import local components

//import css
import './Card.css';

function Carousel(props) {
  
  if (props.size === 0) {
    return(<></>)
  }
  
  let [index, setIndex] = useState(0);
  useEffect(() => {
    if (props.updateChild) {
      props.updateChild(index);
    }
  }, [index]);

  function previousItem() {
    let value = (index - 1);
    value = value + props.size;
    // if (value < 0) {
    //   value = 0;
    // }
    value = value % props.size;
    setIndex(value);
  }

  function nextItem() {
    let value = (index + 1);
    // if (value >= props.size) {
    //   value = props.size - 1;
    // }
    value = value % props.size;
    setIndex(value);
  }

  let showLeft = "block";
  let showRight = "block";
  // let showLeft = (index === 0) ? "none" : "block";
  // let showRight = (index === props.size - 1 || props.size === 0) ? "none" : "block";

  return (<>
    <div className='carousel'>
      <span onClick={previousItem} className='carousel-arrow-left' style={{ display: showLeft }}>
        <img src="/asserts/images/icons/carousel/prev_img.png" className='carousel-arrow' alt="<" />
      </span>
      <div className='carousel-holder'>
        {props.children}
      </div>
      <span onClick={nextItem} className='carousel-arrow-right' style={{ display: showRight }}>
        <img src="/asserts/images/icons/carousel/next_img.png" className='carousel-arrow' alt=">" />
      </span>
    </div>
  </>);
};

function CarouselItem(props) {
  return (<>
    <div className={props.show ? 'carousel-item-show' : 'carousel-item-hide'} >
      {props.children}
    </div>
  </>);
};

export { Carousel, CarouselItem };