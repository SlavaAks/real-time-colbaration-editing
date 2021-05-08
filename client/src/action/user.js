import axios from 'axios'
import {setUser} from "../reducer/userReducer";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/login`, {
                email,
                password
            })
            console.log(response.data.values.user)
            console.log(response.data.values.token)
            dispatch(setUser(response.data.values.user))
            localStorage.setItem('token', response.data.values.token)
            localStorage.setItem('name', response.data.values.user.name)
            localStorage.setItem('second_name', response.data.values.user.second_name)
        } catch (e) {
            //alert(e.response.data.message)
        }
    }
}

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            console.log(response.data.values.user)
            dispatch(setUser(response.data.values.user))
            localStorage.setItem('token', response.data.values.token)
            localStorage.setItem('name', response.data.values.user.name)
            localStorage.setItem('second_name', response.data.values.user.second_name)
        } catch (e) {
            //alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}