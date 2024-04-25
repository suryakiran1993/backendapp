const mongoose = require('mongoose');
const moment = require('moment-timezone');

const jobApplicantSchema = new mongoose.Schema({
    applicantId: {
        type: String,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    //this value will be taken from Job model
    jobid: {
        type: Number,
        required: true
    },
    //this value will be taken from Job Seeker model
    jobseekeremail: {
        type: String,
        required: true
    },
    jobStatus: {
        type: String,
        required: true,
        default: "APPLIED"
    },
    appliedTime: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
    }
});

const JobApplicant = mongoose.model('JobApplicant', jobApplicantSchema);

function generateRandomId() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "J" + randomNumber;
}

module.exports = JobApplicant;
