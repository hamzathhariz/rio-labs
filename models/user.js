const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3,
            max: 128 
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            match: /^[0-9]{10}$/
        },
        email: { 
            type: String,
            trim: true,
            min: 3,
            max: 128,
            unique: true,
            match: /.+\@.+\..+/
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);


userSchema.methods.generateAuthToken = async function() { 
    // Generate JWT Token 
    const user = await this;

    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            phone: this.phone,
            email: this.email,
            admin: this.isAdmin
        }, // payload
        'F&CKL;x&7%AgP.E%', // secret key
        { expiresIn: '1 days' }
    );
}

exports.User = mongoose.model('User', userSchema);

exports.validateUser = function validateUser(user) {
    const schema = Joi.object({
        phone: Joi.string().length(10).pattern(/^[0-9]+$/)
            .messages({'string.pattern.base': "Phone Number must contain numbers only"}),
        email: Joi.string().pattern(/.+\@.+\..+/).required()
        .messages({'string.pattern.base': "email is not valid"}),
        isAdmin: Joi.boolean(),
        name: Joi.string().required()
    });

    return schema.validate(user);
}

exports.validateUserLogin = function validateUserLogin(user) {
    const schema = Joi.object({
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
        .messages({'string.pattern.base': "Phone Number must contain numbers only"}),
        password: Joi.string().required()
    });
    return schema.validate(user);
}
