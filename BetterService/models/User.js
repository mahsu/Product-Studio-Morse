const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    uid: {type: String, required: true}
});

userSchema.pre('save', async function (next) {

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordhash = await bcrypt.hash(this.password, salt);
        this.password = passwordhash;
    } catch (error) {
        next(error)
    }
    next()
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
};

module.exports = mongoose.model('User', userSchema);