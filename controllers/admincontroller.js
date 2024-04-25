const JobSeeker = require("../models/JobSeeker")
const Admin = require("../models/Admin")
const Recruiter = require("../models/Recruiter")
const Job = require("../models/Job")
const JobApplicant = require("../models/JobApplicant")
const Event = require("../models/Event")

const multer = require('multer')
const path = require('path')
const fs = require('fs')


 const viewjobseekers = async (request, response) => 
 {
    try 
    {
      const jobseekers = await JobSeeker.find();
      if(jobseekers.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(jobseekers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  

  const deletejobseeker = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const jobseeker = await JobSeeker.findOne({"email":email})
      if(jobseeker!=null)
      {
        await JobSeeker.deleteOne({"email":email})
        response.status(200).send("Job Seeker Deleted Successfully")
      }
      else
      {
        response.status(200).send("Job Seeker Email ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const admin = await Admin.findOne(input)
       response.json(admin)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const addrecruiter = async (request, response) => {
    try 
    {
      const input = request.body;
      const recruiter = new Recruiter(input);
      await recruiter.save();
      response.status(200).send('Recruiter Added Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const viewrecruiters = async (request, response) => 
 {
    try 
    {
      const recruiters = await Recruiter.find();
      if(recruiters.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(recruiters);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deleterecruiter = async (request, response) => 
 {
    try 
    {
      const uname = request.params.username
      const recruiter = await Recruiter.findOne({"username":uname})
      if(recruiter!=null)
      {
        await Recruiter.deleteOne({"username":uname})
        response.status(200).send("Recruiter Deleted Successfully")
      }
      else
      {
        response.status(200).send("Recruiter Username Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const changeadminpwd = async (request, response) => {
    try 
    {
      const { username, oldpassword, newpassword } = request.body;

      const admin = await Admin.findOne({ username, password: oldpassword });
      
       if (!admin) 
      {
        response.status(400).send('Invalid Old Password');
      }
      else
      {
          if(oldpassword==newpassword)
          {
            response.status(400).send('Both Passwords are Same');
          }
          else
          {
            await Admin.updateOne({username},{ $set: { password: newpassword } });
             response.json('Password Updated Successfully');
          }
        
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  
  
const analysis = async (req, res) => {
  try 
  {
      const jobCount = await Job.countDocuments();
      const jobApplicantCount = await JobApplicant.countDocuments();
      const selectedCount = await JobApplicant.countDocuments({ jobStatus: 'SELECTED' });
      const rejectedCount = await JobApplicant.countDocuments({ jobStatus: 'REJECTED' });
      const recruiterCount = await Recruiter.countDocuments();
      const jobseekerCount = await JobSeeker.countDocuments();

      res.json({jobCount,jobApplicantCount,selectedCount,rejectedCount,recruiterCount,jobseekerCount});
  } 
  catch (error) 
  {
      res.status(500).send(error.message);
  }
};

const viewjobseekerprofile = async (request, response) => 
   {
      try 
      {
        const email = request.params.email
        const jobseeker = await JobSeeker.findOne({email})
        if(jobseeker)
        {
          response.json(jobseeker)
        }
        else
        {
          return response.status(200).send('Job seeker not found with the provided email id');
        }
        
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
    };

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './media/'); // Destination folder
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname); // File naming convention
      }
    });
    
    const upload = multer({ storage: storage }).single('file');
    

    const createevent = async (req, res) =>
    {
      try 
      {
        upload(req, res, async function (err) 
        {
          if (err) 
          {
            console.error(err);
            return res.status(500).send(err.message);
          }
          
          const { category, title, description, date, location } = req.body;
          const fileName = req.file ? req.file.filename : undefined; // Extracting file name
    
          const newEvent = new Event({
            category,
            title,
            description,
            date,
            location,
            file: fileName // Save only the file name
          });
    
          await newEvent.save();
          res.status(200).send('Event Created Successfully');
        });
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send(error.message);
      }
    };
    

const viewevents = async (req, res) => 
{
  try 
  {
    const events = await Event.find();
    res.status(200).json(events);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const eventimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream (binary data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}


  module.exports = {viewjobseekers,deletejobseeker,checkadminlogin,addrecruiter,viewrecruiters,deleterecruiter,changeadminpwd,analysis,viewjobseekerprofile,createevent,viewevents,eventimage}