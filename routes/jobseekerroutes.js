//job seeker routes

const jobseekercontroller = require("../controllers/jobseekercontroller")

const express = require("express")
const jobseekerrouter  = express.Router()

jobseekerrouter.post("/insertjobseeker",jobseekercontroller.insertjobseeker)
jobseekerrouter.post("/checkjobseekerlogin",jobseekercontroller.checkjobseekerlogin)
jobseekerrouter.put("/updatejobseekerprofile",jobseekercontroller.updatejobseekerprofile)
jobseekerrouter.get("/jobseekerprofile/:email",jobseekercontroller.jobseekerprofile)

jobseekerrouter.get("/viewjobsbyjobseeker",jobseekercontroller.viewjobsbyjobseeker)
jobseekerrouter.post("/applyjob",jobseekercontroller.applyjob)
jobseekerrouter.get("/appliedjobs/:email",jobseekercontroller.appliedjobs)


module.exports = jobseekerrouter



