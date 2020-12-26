// App.js
import React, {useState, useEffect} from 'react';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import GoogleButton from 'react-google-button'
import '../scss/Login.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { db, auth } from '../../firebase/firebase.utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const emailChange = (event) => {
  setEmail(event.target.value);
};

const passwordChange = (event) => {
  setPassword(event.target.value);
};

const login = async () => {
  if (email === '' || password === '') {
    console.log('boi')
  } else {
    try {
      const doLogin = await auth.signInWithEmailAndPassword(
        email,
        password,
      );
      if (doLogin.user) {
       console.log('succes')
      }
    } catch (error) {
    }
  }
};

const loginWithGoogle = async () => {
    signInWithGoogle();
    auth.onAuthStateChanged(user => {
      if(user){
        db.collection("Profiles")
              .doc(user.uid)
              .set({
                name: user.displayName,
                photoURL: user.photoURL,
                bio:
                  'This is default bio text.You can create your own bio for other user can know much more about you.',
                profile_owner_id: user.uid,
                birthday: new Date(1598051730000),
                createdAt: new Date(),
                fcm_token: null,
                isChatOpen: true,
              })
              .then(function (docRef) {
                console.log('Succesfully saved.');
              });
      }
    });
};

    return (
      <div className='container conta-login'>
        <div className='login-conta-img'/>
          <div className='login-conta'>
           <img
                src="https://firebasestorage.googleapis.com/v0/b/shouldigo-e0dd0.appspot.com/o/shouldigo-2.png?alt=media&token=42c64548-578c-4d71-9afd-597f6a4f45ff"
                width="80"
                height="80"
                className="logo-img d-inline-block align-top"
                alt="React Bootstrap logo"
            />
            <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="filled-secondary"
              label="Email"
              variant="filled"
              color="secondary"
              fullWidth
              value={email}
              onChange={emailChange}
            />
            <TextField
              id="filled-secondary"
              label="Password"
              variant="filled"
              color="secondary"
              fullWidth
              value={password}
              onChange={passwordChange}
              type="password"
            />
          </form>
          <Button  onClick={() => { login() }} className="sign-in-btn" variant="outline-success">SIGN IN</Button>
          <p>OR</p>
          <GoogleButton onClick={() => { loginWithGoogle() }}/>
          </div>
      </div >
    );
}


export default Login;
