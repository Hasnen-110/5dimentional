import SignIn from '../../services/auth.service'
import ActionType from '../action.types';
import SessionStorage from '../../util/sessionstore';
import { message } from 'antd';
import serviceInterface from '../../services/service.interface';

const session = new SessionStorage();

/*
Actions to be dispatched for signin
- login
    async thunk action which checks for valid login
- loginError
    action to dispatch incase of login error
- operationInProgress
    action to dispatch incase of login operation in progress
- loginSuccess
    action to dispatch incase of sucessfull login
- logout
    action to log out of the system
*/
export function loginError(bool, message) {
    return {
        type: ActionType.LOGIN_ERROR,
        hasError: bool,
        message,
        isLoading: false
    };
}

export function operationInProgress(bool) {
    return {
        type: ActionType.OPERATION_INPROGRESS,
        isLoading: bool
    };
}

export function loginSuccess({token, user}) {
    return {
        type: ActionType.LOGIN_SUCCESS,
        isLoading: false,
        token,
        user
    };
}

export function logout() {
    session.removeAll();
    return {
        type: ActionType.LOGOUT,
        hasError: false,
        isLoading: false,
        token: null,
        user:[]
    };
}

export function login(username, password) {
    return async (dispatch) => {
        try {
            dispatch(operationInProgress(true));
            var data = await serviceInterface.AuthService().login(username, password);         
            dispatch(operationInProgress(false));
            if(data.error) {
                message.error(data.message);
                dispatch(loginError(true, data.message));
            } else 
                dispatch(loginSuccess(data));
        }
        catch(err) {
            dispatch(loginError(true, 'error communicating with the server'));
        }
    };
}

export function signup(user) {
    return async (dispatch) => {
        try {
            dispatch(operationInProgress(true));
            var data = await serviceInterface.AuthService().signup(user);         
            dispatch(operationInProgress(false));
            return data;
        }
        catch(err) {
            dispatch(loginError(true, 'error communicating with the server'));
        }
    };
}
