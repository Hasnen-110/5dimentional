import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { constants } from '../constants';

class Util {

    verifyToken = (token, returndecoded=false) => {
        try {
            let decoded = jwt.verify(token, constants.SECRET);
            return returndecoded ? decoded : token;
        } 
        catch(err) {
            console.log("decode error", err.message);
        }
    }
}

export default new Util()