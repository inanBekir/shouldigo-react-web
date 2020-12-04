import React, {useState, useEffect} from 'react';
import { auth } from '../../firebase/firebase.utils';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from '../Home';
import Root from '../Root';
import Loading from '../components/Loading';
import Show from '../components/experiences/Show';

function AuthLoading() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
          auth.onAuthStateChanged(user => {
            setCurrentUser(user);
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
                                <Route path={"/show"} component={Show}/>
                            </React.Fragment>
                        }
                    </React.Fragment>
                </Root>
            </BrowserRouter>
        );
  }
  
  export default AuthLoading;
  