import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";


export const userLogin = (reqobj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        const response = await axios.post('https://contact-management-five-roan.vercel.app/api/users/login', reqobj)
        localStorage.setItem('user', JSON.stringify(response.data))
        const { token } = response.data;
        if (token) {
            Cookies.set('accessToken', token, { secure: true, sameSite: 'Strict', expires: 1 }); // 1 day expiry
        }

        dispatch({ type: 'LOADING', payload: false })
        message.success('login successfull')
        setTimeout(() => {

            window.location.href = '/admin'
        }, 50)
    } catch (error) {
        console.log(error)
        message.error('error' + error)
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const userRegister = (reqobj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        await axios.post('https://contact-management-five-roan.vercel.app/api/users/register', reqobj)
        dispatch({ type: 'LOADING', payload: false })
        message.success('Registration successfull')
        setTimeout(() => {

            window.location.href = '/login'
        }, 50)
    } catch (error) {

        console.log(error)
        message.error('Something went wrong')
        dispatch({ type: 'LOADING', payload: false })

    }
}