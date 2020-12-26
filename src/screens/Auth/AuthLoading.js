import React, {useState, useEffect} from 'react';
import { db, auth } from '../../firebase/firebase.utils';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from '../Home';
import Root from '../Root';
import Experience from '../components/experiences/Experience';
import Profile from '../Auth/Profile';
import Comments from '../components/experiences/Comments';
import Chat from '../components/experiences/Chat';
import YourExperiences from '../components/experiences/YourExperiences';

function AuthLoading() {
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
          auth.onAuthStateChanged(user => {
            if(user){
              setCurrentUser(user);
              localStorage.setItem('userUID', user.uid);
            }
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
                                <Route path={"/your-experiences"} component={YourExperiences}/>
                                <Route path={"/profile"} component={Profile}/>
                                <Route path={"/comments"} component={Comments}/>
                                <Route path={"/chat"} component={Chat}/>
                            </React.Fragment>
                        }
                    </React.Fragment>
                </Root>
            </BrowserRouter>
        );
  }
  
  export default AuthLoading;
  