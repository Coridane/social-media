const {Schema, model} = require('mongoose');

const userSch = new Schema(
    {              
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'E-mail cannot be blank'],
            unique: [true, 'An account has already been registered under that e-mail'],
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid e-mail address',],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {
        toJSON: {
            virtuals: true,},
            id: false,        
    }
);

userSch.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model("User", userSch);

module.exports = User;