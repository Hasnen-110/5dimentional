import ActionType from '../action.types';

/*
    Reducer function to push data to the store in case of different signin action types
*/

export default function login(state = {isLoading: false, user: {}}, action) {
    switch (action.type) {
        case ActionType.LOGIN_ERROR:
            return { error: action.hasError, message: action.message, isLoading: action.isLoading };
        case ActionType.PASSWORD_ERROR:
            return { ...state, resetError: action.resetError, message: action.message, isLoading: action.isLoading };
        case ActionType.OPERATION_INPROGRESS:
            return {...state, isLoading: action.isLoading, resetError: action.resetError, successMessage: action.successMessage};
        case ActionType.LOGIN_SUCCESS:
            return { ...state, token: action.token, isLoading: action.isLoading, customer: action.customer, user: action.user, company: action.company };
        case ActionType.LOGOUT:
            return { token: action.token, isLoading: action.isLoading, customer: action.customer, user: action.user };
        default:
            return state;
    }
}
