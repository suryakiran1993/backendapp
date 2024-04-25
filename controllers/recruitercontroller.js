const Recruiter = require("../models/Recruiter")
const Job = require("../models/Job")
const JobApplicant = require("../models/JobApplicant")

const checkrecruiterlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const recruiter = await Recruiter.findOne(input)
     response.json(recruiter)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

 const addjob = async (request, response) => {
  try 
  {
    const input = request.body;
    const job = new Job(input);
    await job.save();
    response.status(200).send('Job Posted Successfully');
  } 
  catch(e) 
  {
    console.log(e.message)
    response.status(500).send(e.message);
  }
};

const viewjobs = async (request, response) => 
 {
    try 
    {
      const runame = request.params.runame
      const jobs = await Job.find({"recruiter.username":runame});
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

  const viewjobapplicants = async (request, response) => 
  {
    try 
    {
        const runame = request.params.runame;
        const jobs = await Job.find({ "recruiter.username": runame });

        if (jobs.length === 0) 
        {
            return response.status(200).send("No jobs found for this recruiter");
        }
        else
        {
          const jobIds = jobs.map(job => job.jobid);

          const jobApplicants = await JobApplicant.find({ jobid: { $in: jobIds } });
  
          if (jobApplicants.length === 0) 
          {
              return response.status(200).send("No job applicants found for this job");
          }
          else
          {
            response.json(jobApplicants);
          }
        }
    } 
    catch (error) 
    {
        response.status(500).send(error.message);
    }
};

const changejobstatus = async (request, response) => 
{
  try 
  {
    const { applicantId, status } = request.body;

    if (!applicantId || !status) 
    {
      return response.status(400).send('Applicant ID and status are required');
    }

    await JobApplicant.findOneAndUpdate(
      { applicantId },
      { $set: { jobStatus: status } },
      { new: true } // it will return updated document
    );

    response.status(200).send('Job Status Updated Successfully');
  } catch (error) {
    response.status(500).send(error.message);
  }
};



 module.exports = {checkrecruiterlogin,addjob,viewjobs,viewjobapplicants,changejobstatus}