import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            name: "",
            second_name: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { email, password, name, second_name } = this.state;

        axios
            .post(
                "http://localhost:5000/registration",
                    {
                    email,
                    password,
                    name,
                    second_name
                }

            )
            .then(response => {
                console.log(response.status)
                if (response.status === 200) {
                    const { history } = this.props;
                    history.push(`/Login`)
                }
                if(response.status ===302){
                    alert("Пользователь с таким логином существует")
                }
            })
            .catch(error => {
                alert("Пользователь с таким логином существует")
                console.log("registration error", error);
            });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="name"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="second_name"
                        name="second_name"
                        placeholder="second_name"
                        value={this.state.second_name}
                        onChange={this.handleChange}
                        required
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default  withRouter(Registration)