import util from './util';
import bcrypt from 'bcrypt'
import config from '../config/config';
import ApplicationError, { ERROR } from './error';
import momentModel from '../data/models/moment';
import fs from 'fs';
// import time from 'moment';

class Moment {
    constructor(options={
        userid: undefined,
        moment: {
            _id: undefined,
            title: undefined,
            tags: [],
            image: undefined,
            base64: undefined
        }
    }) {
        this.userid = options.userid;
        this.moment = options.moment;
    }

    _validateMoment() {
        if (
            !this.moment ||
            !this.moment.title || 
            !this.moment.image || 
            !this.moment.tags 
        ) throw new ApplicationError(ERROR.BAD_REQUEST);
    }

    async _fetchDoc() {
        if (!this.userid) throw new ApplicationError(ERROR.BAD_REQUEST);
        var doc = undefined;
        try {
            doc = await momentModel.findOne({userid: this.userid});
        } catch(err) {
            console.log(err);
            throw new ApplicationError(ERROR.GENERAL_ERROR);
        }
        if (!doc) throw new ApplicationError(ERROR.BAD_REQUEST);
        return doc;
    }

    async _saveImage() {
        console.log(this.moment.base64)
        var matches = this.moment.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        fs.writeFile(__dirname+"/images/"+ this.moment.image, response.data, function(err) { 
            console.log(err);
        });
    } 

    async _addMoment() {
        try {
            var momentObj = await this._fetchDoc();
            this._saveImage();
            momentObj.moments.push({...this.moment, _id: undefined, base64: undefined});
            return await momentObj.save();
        } catch(err) {
            console.log(err);
            throw new ApplicationError(ERROR.GENERAL_ERROR);
        }
    }

    async getMoments() {
        var momentObj = await this._fetchDoc();
        return {moments: momentObj.moments};
    }

    async addMoment() {
        this._validateMoment();
        var moment = this._addMoment();
        return { moment };
    }
    
}

export default Moment;