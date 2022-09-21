const { model, Schema } = require('mongoose');


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
},{
    toJSON: {
        transform(_, ret) {
            ret.id = ret._id;

            delete ret.password;
            delete ret._id;
            delete ret.__v;
        }
    }
});


module.exports = model('User', UserSchema);