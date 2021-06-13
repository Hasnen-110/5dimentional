import { combineReducers } from 'redux';
import profile  from './profile.reducer';
import moment from './moment.reducer';

export default combineReducers({
    profile,
    moment
});