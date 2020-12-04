import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase.utils';
import { Card, Button } from 'react-bootstrap';
import './scss/Home.scss'
import { useHistory } from "react-router-dom";

function Home() {
    const history = useHistory();
    const [experiences, setExperiences] = useState([]);

    const goShow = (param) => history.push('show',{param: param});
   

    useEffect(() => {
        db.collection('Experiences').get()
        .then(querySnapshot => {
        const allExperiences = [];
        querySnapshot.forEach( doc => {

            allExperiences.push({
                ...doc.data(),
                key: doc.id,
              });
        })
        setExperiences(allExperiences);
      })
      .catch(err => {
        console.log(err.message)
      })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      function ExperiencesList({ items }) {
        return items.map(item => (
            <Card key={item.key} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary" onClick={() => goShow(item.key)}>Go somewhere</Button>
            </Card.Body>
            </Card>
        ));
      }
    
  return (
    <div className="home-content">
        <ExperiencesList items={experiences} />
    </div>
  );
}

export default Home;
