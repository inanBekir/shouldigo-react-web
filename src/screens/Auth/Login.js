// App.js
import React, {useState, useEffect} from 'react';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import GoogleButton from 'react-google-button'
import '../../App.css';

function Login() {
    return (
      <div className='container'>
        <GoogleButton onClick={signInWithGoogle}/>
      </div >
    );
}


export default Login;
