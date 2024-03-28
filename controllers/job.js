const Job = require("../models/job");
const createJobPost = async (req, res, next) => {
  try {
    next();
    const {
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationType,
      skills,
      refUserId,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !duration ||
      !locationType ||
      !skills
    ) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const userId = req.userId;

    const jobDeatils = new Job({
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationType,
      skills,
      refUserId,
    });
    await jobDeatils.save();
    res.json({ message: "Job created Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errrorMessage: "Something went wrong" });
  }
};
const getJobDetailsById = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const jobDeatils = await Job.findById(jobId);
    if (!jobDeatils) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }
    res.json({ data: jobDeatils });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong !" });
  }
};

const updateJobDetailsById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const isJobExists = await Job.findOne({ _id: jobId, refUserId: userId });

    if (!isJobExists) {
      return res.status(404).json({
        errorMessage: "Job not found",
      });
    }

    const {
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationType,
      skills,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !duration ||
      !locationType ||
      !skills
    ) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    await Job.updateOne(
      { _id: jobId, refUserId: userId },
      {
        $set: {
          companyName,
          logoUrl,
          title,
          description,
          salary,
          location,
          duration,
          locationType,
          skills,
        },
      }
    );

    res.json({ message: "Job updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};
const getAllJobs = async (req, res, next) => {
  try {
    const title = req.query.title || "";
    const skills = req.query.skills;

    let filteredSkills;
    let filter = {};
    if (skills) {
      filteredSkills = skills.split(",");
      const caseInsensitiveFilteredSkills = filteredSkills.map(
        (element) => new RegExp(element, "i")
      );
      filter = { skills: { $in: filteredSkills } };
    }
    const joblist = await Job.find(
      { title: { $regex: title, $options: "i" }, ...filter },
      { companyName: 1, title: 1 }
    );
    res.json({ data: joblist });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobPost,
  getJobDetailsById,
  updateJobDetailsById,
  getAllJobs,
};
