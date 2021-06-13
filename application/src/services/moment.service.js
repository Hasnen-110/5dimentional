
import { message } from 'antd';
import Axios from 'axios';
import { constants } from '../constants';
import SessionStorage from '../util/sessionstore';

const session = new SessionStorage();

const { ROLE } = constants;

export default class Moment {

    getMoments = async (userid) => {
        try {
            var response = await Axios.get(
                constants.LINK+'/moments/'+userid,
                { 'headers':  constants.TOKEN_STR(session.getToken())}
            );
            if (response.data.status == 200){
                console.log(response.data);
                return response.data;
            } else {
                message.error(response.data.message);
            }
        } catch(err) {
            console.log(err, "errror");
            err.message && message.error(err.message);
            // return err;
        }
    }

    addMoments = async (moment, userid) => {
        try {
            var response = await Axios.post(
                constants.LINK+'/moments',
                {moment, userid},
                { 'headers':  constants.TOKEN_STR(session.getToken())}
            );
            if (response.data.status == 200){
                console.log(response.data);
                return response.data;
            } else {
                message.error(response.data.message);
            } 
        } catch(err) {
            console.log(err, "errror");
            err.message && message.error(err.message);
            // return err;
        }
    }
}