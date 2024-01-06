const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const TokenSchema = new Schema({
    owner: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String
    },
}, { timestamps: true });

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;