// recruiter routes

const recruitercontroller = require("../controllers/recruitercontroller")

const express = require("express")
const recruiterrouter = express.Router()


recruiterrouter.post("/checkrecruiterlogin",recruitercontroller.checkrecruiterlogin)
recruiterrouter.post("/addjob",recruitercontroller.addjob)
recruiterrouter.get("/viewjobs/:runame",recruitercontroller.viewjobs)

recruiterrouter.get("/viewjobapplicants/:runame",recruitercontroller.viewjobapplicants)
recruiterrouter.post("/changejobstatus",recruitercontroller.changejobstatus)


module.exports = recruiterrouter
