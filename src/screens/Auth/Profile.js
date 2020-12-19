import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebase.utils';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function Profile() {
    const history = useHistory();
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user.uid);
            db.collection("Profiles")
                .doc(user.uid)
                .get()
                .then(doc => {
                const data = doc.data();
                console.log(data); 
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
  return (
    <div>
        <p>heasd</p>
    </div>
  );
}

export default Profile;
