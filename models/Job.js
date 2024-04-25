const mongoose = require('mongoose');
const moment = require('moment-timezone');

const jobschema = new mongoose.Schema({
    jobid: {
        type: Number,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
              return value >= 1000;
            },
            message: 'Salary must be at least 1000'
          }
    },
    jobtype: { 
        type: String,
        required: true
    },
    educationqualifications: { 
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true 
    },
    postedtime: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
    },
    recruiter: {
        type: Object,
        required: true
    }
});

const job = mongoose.model('Job', jobschema);

function generateRandomId() {
    return Math.floor(Math.random() * 900000) + 100000;
}

module.exports = job;