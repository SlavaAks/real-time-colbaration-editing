import React, {useState} from 'react';
import "../styles/authorization.css"
import Input from "../utils/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../action/user";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    return (
        <div className='authorization'>
            <div className="authorization__header">Авторизация</div>
            <Input className="auth" value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input className="auth" value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>Войти</button>
        </div>
    );
};

export default Login;






// import React, { Component } from "react";
// import axios from "axios";

// export default class Login extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             email: "",
//             password: "",
//             loginErrors: ""
//         };

//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(event) {
//         this.setState({
//             [event.target.name]: event.target.value
//         });
//     }

//     handleSubmit(event) {
//         const { email, password } = this.state;

//         axios
//             .post(
//                 "http://localhost:5000/login",
//                 {

//                     email,
//                     password

//                 }
//             )
//             .then(response => {
//                 console.log(response.data);
//                 if (response.data.logged_in) {
//                     this.props.handleSuccessfulAuth(response.data);
//                 }
//             })
//             .catch(error => {
//                 console.log("login error", error);
//             });
//         event.preventDefault();
//     }

//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={this.state.email}
//                         onChange={this.handleChange}
//                         required
//                     />

//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={this.state.password}
//                         onChange={this.handleChange}
//                         required
//                     />

//                     <button type="submit">Login</button>
//                 </form>
//             </div>
//         );
//     }
// }