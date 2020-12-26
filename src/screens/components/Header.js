import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase.utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../screens/scss/Header.scss'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Image } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import useMediaQuery from '@material-ui/core/useMediaQuery';

var navBarTransparent;
const navBarColor = {backgroundColor:'rgba(2, 2, 2, 0.7)'};
export default function Header(){
    const history = useHistory();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [currentUser, setCurrentUser] = useState('');
    const large = useMediaQuery('(max-width:991px)');

    if (large) {
        navBarTransparent = {backgroundColor:'rgba(2, 2, 2, 0.7)'};
    }else{
        navBarTransparent = {backgroundColor:'transparent'};
    }
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    const logout = () => {
        auth.signOut();
        window.location.href = 'http://localhost:3000/';
    };

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (
        <Navbar style={scrollPosition >= 5 ? navBarColor : navBarTransparent} expand="lg">
        <Navbar.Brand href="/">
            <img
                src="https://firebasestorage.googleapis.com/v0/b/shouldigo-e0dd0.appspot.com/o/shouldigo-2.png?alt=media&token=42c64548-578c-4d71-9afd-597f6a4f45ff"
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
            <NavLink className="btn btn-outline-success" to="/create">Create Experience</NavLink> 
            <NavDropdown title={currentUser ? <Image src={currentUser.photoURL} roundedCircle /> : 'b'} id="basic-nav-dropdown">
                <div className="logout-btn-div">
                    <PersonIcon  />
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                </div>
                <div className="logout-btn-div">
                    <AccessibilityNewIcon  />
                    <NavDropdown.Item href="/your-experiences">Your Experiences</NavDropdown.Item>
                </div>
                <NavDropdown.Divider />
                <div className="logout-btn-div">
                    <ExitToAppIcon  />
                    <Button className="logout-btn" onClick={logout}>Logout</Button>
                </div>
            </NavDropdown>
        </Navbar.Collapse>
        </Navbar>
    );
}