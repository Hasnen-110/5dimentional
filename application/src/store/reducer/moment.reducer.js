import ActionType from '../action.types';

/*
    Reducer function to push data to the store in case of different moment action types
*/

export default function moment(state = {isLoading: false, moments: []}, action) {
    switch (action.type) {
        case ActionType.SET_MOMENTS:
            return { ...state, moments: action.moments, isLoading: action.isLoading };
        case ActionType.LOGOUT:
            return { moments: [], isLoading: false };
        default:
            return state;
    }
}
