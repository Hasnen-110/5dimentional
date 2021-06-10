import util from './util';
import bcrypt from 'bcrypt'
import config from '../config/config';
import ApplicationError, { ERROR } from './error';
import userModel from '../data/models/user';
import moment from '../data/models/moment';

class User {
    constructor(options={
        user: {
            firstname: undefined,
            lastname: undefined,
            password: undefined,
            phone: undefined,
            email: undefined,
            city: undefined
        }
    }) {
        this.user = options.user;
    }

    _validateUser() {
        if (
            !this.user ||
            !this.user.firstname || 
            !this.user.lastname || 
            !this.user.email ||
            !this.user.city || 
            !this.user.password ||
            !this.user.phone
        ) throw new ApplicationError(ERROR.INVALID_USER);
    }

    async _checkEmailExist() {
        var obj = await userModel.findOne({email: this.user.email});
        if (obj) throw new ApplicationError(ERROR.USER_ALREADY_EXIST);
    }

    async _addUser() {
        try {
            return await userModel.create({...this.user});
        } catch(err) {
            console.log(err);
            throw new ApplicationError(ERROR.GENERAL_ERROR);
        }
    }

    async _addMoment(userid) {
        try {
            return await moment.create({userid, moments: []});
        } catch(err) {
            console.log(err);
            throw new ApplicationError(ERROR.GENERAL_ERROR);
        }
    }

    async signin() {
        let userObj = await userModel.findOne({email: this.user.email});
        if (!userObj) throw new ApplicationError(ERROR.USER_NOT_EXIST);
        if (
            !await bcrypt.compare(this.user.password, userObj.password)
        ) throw new ApplicationError(ERROR.INVALID_PASSWORD); 
        return {
            user: userObj,
            token: util.generateToken(userObj)
        }
    }

    async signup() {
        this._validateUser();
        await this._checkEmailExist();
        var resp = await this._addUser();
        await this._addMoment(resp._id);
        return {};
    }
    
}

export default User;