import {model, Schema} from 'mongoose';

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin','user','manager'],
        default: 'user'
    }
});

const userModel = model('User',userSchema);

export default userModel;