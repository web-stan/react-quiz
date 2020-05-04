import axios from "axios"
import { auth_Success, auth_Logout } from "./actionsTypes"

export function auth(email, password, isLogin) {
   return async dispath => {
        const authData= {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8i-6oxv97BjCiEbiQfymKXbOyt8e1hCo'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8i-6oxv97BjCiEbiQfymKXbOyt8e1hCo'
        }

        const response = await axios.post(url, authData)
        const data = response.data

        console.log(data)

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)//js дата 1588199178494 из-за .getTime() 
        console.log('expirationDate: ', expirationDate);

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispath(authSuccess(data.idToken))

        dispath(authLogout(data.expiresIn))

   }
}

export function authSuccess(token) {
    return {
        type: auth_Success,
        token
    }
}

export function authLogout(time) {
    return dispath => {
        setTimeout(() => {
            dispath(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: auth_Logout 
    }
}

export function autoLogin() {
    return dispath => {
        const token = localStorage.getItem('token') 
        if(!token) {
            dispath(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate')) //преобразовуем не в js дата
            if (expirationDate <= new Date()) {
                dispath(logout())
            } else {
                dispath(authSuccess(token))

                dispath(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
                
            }
        }
    } 
}