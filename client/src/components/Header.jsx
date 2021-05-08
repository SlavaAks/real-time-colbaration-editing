import React, { Component } from 'react';

import { Nav, Navbar, Button, FormControl, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import logo from './logo/vgu.jpg'
import axios from 'axios'
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../reducer/userReducer"
// class Header extends Component {
const Header = (props) => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const handleCreateDocument = () => {
        axios.post(`http://localhost:5000/create_doc`, {})
            .then(response => {
                const { history } = props;
                history.push(`/word/${response.data.uuid}`)
            })
    }

    const handleCreateHolst = () => {
        axios.post(`http://localhost:5000/create_holst`, {})
            .then(response => {
                const { history } = props;
                history.push(`/paint/${response.data.uuid}`)
            })
    }



    return (

        <Navbar collapseOnSelect expand="md" bg="dark" variant="primary" style={{ marginBottom: 'auto' }}>
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo}
                        height="30"
                        width="30"
                        className="d-inline-block align-top"
                        alt="logo" />
                                EsepAks
                    </Navbar.Brand>
                <Nav className="mr-auto">
                {!isAuth &&<Nav.Link><Link to="/Login">SigIn</Link></Nav.Link>}
                    {!isAuth &&<Nav.Link><Link to="/Registration">Registration</Link></Nav.Link>}
                </Nav>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Form inline>
                        <Button variant="outline-info" onClick={handleCreateHolst}>New holst</Button>
                        <Button variant="outline-info" onClick={handleCreateDocument}>New document</Button>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-info">Search</Button>
                        {isAuth &&<Button variant="primary" onClick={() => dispatch (logout()) }>SignOut</Button>}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default withRouter(Header)