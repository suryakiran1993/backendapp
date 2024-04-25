//admin routes
const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const adminrouter  = express.Router()


adminrouter.get("/viewjobseekers",admincontroller.viewjobseekers)
adminrouter.delete("/deletejobseeker/:email",admincontroller.deletejobseeker)
adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)

adminrouter.post("/addrecruiter",admincontroller.addrecruiter)
adminrouter.get("/viewrecruiters",admincontroller.viewrecruiters)
adminrouter.delete("/deleterecruiter/:username",admincontroller.deleterecruiter)
adminrouter.put("/changeadminpwd",admincontroller.changeadminpwd)

adminrouter.get("/analysis",admincontroller.analysis)
adminrouter.get("/viewjobseekerprofile/:email",admincontroller.viewjobseekerprofile)


// upload and display events with images

adminrouter.post("/createevent",admincontroller.createevent)
adminrouter.get("/viewevents",admincontroller.viewevents)
adminrouter.get("/eventimage/:filename",admincontroller.eventimage)


module.exports = adminrouter

