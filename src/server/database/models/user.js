const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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

UserSchema.pre('save', function(next) {
	let user = this;
	if (!user.isModified("password")) {
		return next();
	}
	bcrypt.genSalt(10, function(err, salt){
		if (err) { return next(err); }

		bcrypt.hash(user.password, salt,function(err, hash) {
			if (err) { return next(err); }

			user.password = hash;
			next();
		})
	})
})

const User = mongoose.model('User', UserSchema);

module.exports = User;