const mongoose = require('mongoose');
const crypto = require('crypto');
const _ = require('underscore');


const status = {
    invalid: "Invalid",
    valid: "Valid",
    pending: "Pending"
};
const enumStatus = _.values(status);

const type = {
    passport: "Passport",
    dl: "Driver's License",
    address: "Address",
    ssn: "SSN"
};

const enumType = _.values(type);


const identitySchema = new mongoose.Schema({
    uid: {type: String, required: true},
    type: {type: String, enum: enumType, required: true},
    status: {type: String, enum: enumStatus, required: true },
    timestamp: {type: Date, default: Date.now()},
    payload: {type: String, required: true}
});

identitySchema.statics.createDigest = function(documentbody, userid, requestid, timestamp) {
    let verify = userid + requestid + documentbody + timestamp;
    const hash = crypto.createHash('sha256');
    hash.update(verify);
    return hash.digest('hex');
};

identitySchema.methods.isValidDocument = async function (documentbody, userid, requestid, timestamp) {
    let digest = this.constructor.createDigest(documentbody, userid, requestid, timestamp);
    return this.payload === digest;
};

module.exports = mongoose.model('Identity', identitySchema);