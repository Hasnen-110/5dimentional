import ActionType from '../action.types';
import serviceInterface from '../../services/service.interface';
import { operationInProgress } from './profile.action';

export function setMoments({moments}) {
    return {
        type: ActionType.SET_MOMENTS,
        moments
    };
}

export function getMoments(userid) {
    return async (dispatch) => {
        try {
            dispatch(operationInProgress(true));
            var data = await serviceInterface.MomentService().getMoments(userid);         
            dispatch(operationInProgress(false));
            dispatch(setMoments(data));
            return data;
        }
        catch(err) {
            console.log(err);
        }
    };
}

export function addMoments(moment, userid) { 
    return async (dispatch) => {
        try {
            dispatch(operationInProgress(true));
            var data = await serviceInterface.MomentService().addMoments(moment, userid);         
            dispatch(operationInProgress(false));
            return data;
        }
        catch(err) {
            console.log(err);
        }
    };
}