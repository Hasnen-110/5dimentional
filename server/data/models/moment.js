import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config/config';
import moment from 'moment';

const Schema = Mongoose.Schema;

let MomentSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    moments: [{
        title: {
            type: String, 
            required: true
        },
        tags: [{
            type: String, 
            required: false
        }],
        image: {
            type: String,
            required: true,
            unique: true
        },
    }]
},{
    timestamps:true
});

export default Mongoose.model('Moment', MomentSchema);