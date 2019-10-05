const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
		unique: true,
		lowercase: true,
        required: true,
        index: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        index: true,
        trim: true,        
    },
    bio: String,
    pic: String,
    hash: String,
    salt: String
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;