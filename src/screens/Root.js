import React from 'react';
import Header from './components/Header';
import './scss/Root.scss'

export default function Root(props) {
  return (
   <div className="main">
        <Header/>
       <div className='root-container'>
            {props.children}
       </div>
   </div>
  );
}