import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config/config';
import moment from 'moment';

const Schema = Mongoose.Schema;

let UserSchema = new Schema({
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
        type: String, 
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
},{
    timestamps:true
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(config.salt_work_factor, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});


export default Mongoose.model('User', UserSchema);