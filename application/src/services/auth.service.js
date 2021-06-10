
import { message } from 'antd';
import Axios from 'axios';
import { constants } from '../constants';
import SessionStorage from '../util/sessionstore';

const session = new SessionStorage();

const { ROLE } = constants;

export default class SignIn {

    login = async (email, password) => {
        try {
            var response = await Axios.post(constants.LINK+'/signin', {email, password});
            if (response.data.status == 200){
                console.log(response.data);
                let profile = {...response.data};
                session.setProfile(profile);
                return profile;
            } else {
                message.error(response.data.message);
            }
        } catch(err) {
            console.log(err, "errror");
            err.message && message.error(err.message);
            // return err;
        }
    }

    signup = async (user) => {
        try {
            var response = await Axios.post(constants.LINK+'/signup', {...user});
            if (response.data.status == 200){
                console.log(response.data);
                return response.data;
            } else {
                message.error(response.data.message);
            }
        } catch(err) {
            console.log(err);
            return err;
        }
    }

    format = (data) => {
        return {
            token: data.token,
            customer: data.customer,
            company: data.company,
            user: {
                _id: data._id,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                userimage: data.userimage,
                role: data.role,
                signature: data.signature,
                surgeon: data.surgeon,
                lastlogintime: data.lastlogintime
            }
        }
    }
}