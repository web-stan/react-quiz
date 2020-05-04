import { auth_Success, auth_Logout } from "../actions/actionsTypes"

let initialState = {
    token: false
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case auth_Success:
            return {
                ...state, token: action.token
            } 
        case auth_Logout: 
            return {
                ...state, token: null
            }
        default:
            return state
    }
}