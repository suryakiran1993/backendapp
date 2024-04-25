const JobSeeker = require("../models/JobSeeker")
const Job = require("../models/Job")
const JobApplicant = require("../models/JobApplicant")

const insertjobseeker = async (request, response) => {
    try 
    {
      const input = request.body;
      const jobseeker = new JobSeeker(input);
      await jobseeker.save();
      response.status(200).send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const updatejobseekerprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const jobseeker = await JobSeeker.findOne({ email });
      if (!jobseeker) 
      {
        response.status(200).send('Job seeker not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          jobseeker[key] = input[key];
        }
      }
      await jobseeker.save();
      response.status(200).send('Job Seeker Profile Updated Successfully');
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
  };


  const checkjobseekerlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const jobseeker = await JobSeeker.findOne(input)
       response.json(jobseeker)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const jobseekerprofile = async (request, response) => 
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

  const viewjobsbyjobseeker = async (request, response) => 
 {
    try 
    {
      const jobs = await Job.find();
      if(jobs.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(jobs);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const appliedjobs = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const appliedjobs = await JobApplicant.find({"jobseekeremail":email});
      if(appliedjobs.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(appliedjobs);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const applyjob = async (request, response) => {
    try 
    {
      const input = request.body; // job id and job seeker mail id
      const alreadyapplied = await JobApplicant.findOne(input)
      if(!alreadyapplied)
      {
        const jobapplicant = new JobApplicant(input);
        await jobapplicant.save();
        response.status(200).send('Job Applied Successfully');
      }
      else
      {
        response.status(200).send('OOPS ... You have already applied for this Job');
      }
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };


  module.exports = {insertjobseeker,checkjobseekerlogin,updatejobseekerprofile,jobseekerprofile,viewjobsbyjobseeker,applyjob,appliedjobs}