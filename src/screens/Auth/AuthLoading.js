import React, {useState, useEffect} from 'react';
import { db, auth } from '../../firebase/firebase.utils';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from '../Home';
import Root from '../Root';
import Loading from '../components/Loading';
import Experience from '../components/experiences/Experience';
import Profile from '../Auth/Profile';
import Comments from '../components/experiences/Comments';

function AuthLoading() {
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
          auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            localStorage.setItem('userUID', user.uid);
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
          });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentUser]);

        return (
            <BrowserRouter>
                <Root>
                    <React.Fragment>
                        {!currentUser ? 
                           <React.Fragment>
                            <Route exact path={"/"} component={Login}/>
                            <Route path={"/register"} component={Register}/>
                          </React.Fragment> 
                        :
                            <React.Fragment>
                                <Route exact path={"/"} component={Home}/>
                                <Route path={"/experience"} component={Experience}/>
                                <Route path={"/profile"} component={Profile}/>
                                <Route path={"/comments"} component={Comments}/>
                            </React.Fragment>
                        }
                    </React.Fragment>
                </Root>
            </BrowserRouter>
        );
  }
  
  export default AuthLoading;
  