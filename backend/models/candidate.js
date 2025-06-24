const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    cnic: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    batch: { type: String, required: true },
    reg: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    score: { type: Number, default: null }
}, {
    timestamps: true
});

module.exports = mongoose.model('Candidate', candidateSchema);