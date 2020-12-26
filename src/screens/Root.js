import React,{ useState, useEffect } from 'react';
import Header from './components/Header';
import './scss/Root.scss'
import { auth } from '../firebase/firebase.utils';

export default function Root(props) {
  const [currentUser, setCurrentUser] = useState('');


  useEffect(() => {
     auth.onAuthStateChanged(user => {
         setCurrentUser(user);
     });
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

  return (
   <div className="main">
       {currentUser ? <Header/> : null }
       <div className='root-container'>
            {props.children}
       </div>
   </div>
  );
}