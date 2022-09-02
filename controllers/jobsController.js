import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError('Company and position are required');
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  if (!jobs) {
    throw new BadRequestError('No jobs found');
  }
  res.status(StatusCodes.OK).json({ jobs });
};
const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  if (!job) {
    throw new BadRequestError('Bad request');
  }
  res.status(StatusCodes.OK).json({ msg: 'ok' });
};
const modifyJob = async (req, res) => {
  const { company, jobSetting, jobStatus, jobType, officeLocation, position } =
    req.body;
  if (!position || !company) {
    throw new BadRequestError('Company and position are required');
  }
  let job = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  if (!job) {
    throw new BadRequestError('Bad request');
  }
  job.company = company;
  job.setting = jobSetting;
  job.status = jobStatus;
  job.type = jobType;
  job.officeLocation = officeLocation;
  job.position = position;
  await job.save();
  res.status(StatusCodes.OK).json({ job });
};
const showStats = async (req, res) => {
  res.send('showstats');
};

export { showStats, getAllJobs, createJob, modifyJob, deleteJob };
