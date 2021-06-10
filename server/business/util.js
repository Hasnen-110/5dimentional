import config from '../config/config';
import jwt from 'jsonwebtoken';

class Util {
    constructor() {
        
    }

    static generateToken(row) {
        return jwt.sign(
            { _id : row._id, email: row.email}, 
            config.secret, 
            {expiresIn:  config.tokenExpiry.user}
        );
    }

    static decodeToken(token) {
        return jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return false
            }

            if (decoded) {
                return decoded
            }
            
        })
    }
}

export default Util;