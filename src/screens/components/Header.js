import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase.utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../screens/scss/Header.scss'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const navBarTransparent = {backgroundColor:'transparent'};
const navBarColor = {backgroundColor:'rgba(2, 2, 2, 0.7)'};
export default function Header(){
    const [scrollPosition, setScrollPosition] = useState(0);
    const [currentUser, setCurrentUser] = useState('');

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
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
                src="https://firebasestorage.googleapis.com/v0/b/shouldigo-e0dd0.appspot.com/o/site-main.png?alt=media&token=55c8236c-6088-4bf3-a898-5bbc11c96844"
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
            <NavLink className="btn btn-primary" to="/create">Create Experience</NavLink> 
            <NavDropdown title={<Image src={currentUser.photoURL} roundedCircle />} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Your Experiences</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
        </Navbar>
    );
}