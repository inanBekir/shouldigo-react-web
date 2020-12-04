import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase.utils';
import { Carousel } from 'react-bootstrap';
import '../../scss/Show.scss'

function Show(props) {
    const id = props.location.state.param;
    const [experience, setExperience] = useState([]);
    useEffect(() => {
        db.collection('Experiences').doc(id).onSnapshot((documentSnapshot) => {
            setExperience(documentSnapshot.data());
          });
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

  return (
   <div>
       <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100 carousel-image"
                src={experience.image}
                alt={experience.name}
                />
                <Carousel.Caption>
                <h3>{experience.name}</h3>
                <p>{experience.feel}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
  );
}

export default Show;
