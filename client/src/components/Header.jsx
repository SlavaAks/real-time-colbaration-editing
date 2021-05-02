import React, { Component } from 'react';

import { Nav, Navbar, Button, FormControl, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router';
import logo from './logo/vgu.jpg'
import axios from 'axios'
import { withRouter } from "react-router";


class Header extends Component {
    handleCreateDocument = () => {
        axios.post(`http://localhost:5000/create_doc`, {})
            .then(response => {
                const {history} = this.props;
                history.push(`/word/${response.data.uuid}`)
            })
    }

    handleCreateHolst = () => {
        axios.post(`http://localhost:5000/create_holst`, {})
            .then(response => {
                const {history} = this.props;
                history.push(`/paint/${response.data.uuid}`)
            })
    }


    render() {
        return (

            <Navbar collapseOnSelect expand="md" bg="primary" variant="dark" style={{ marginBottom: 'auto' }}>
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo}
                            height="50"
                            width="50"
                            className="d-inline-block align-top"
                            alt="logo" />
                                EsepAks
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Form inline>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                            />
                            <Button variant="outline-info">Search</Button>
                            <Button variant="outline-info" onClick={this.handleCreateDocument}>New document</Button>
                            <Button variant="outline-info" onClick={this.handleCreateHolst}>New holst</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default withRouter(Header)