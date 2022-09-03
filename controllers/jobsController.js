import mongoose from 'mongoose';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import checkPermission from '../utils/checkPermissions.js';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js';

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
  res.status(StatusCodes.OK).json({ jobs, hits: jobs.length, numOfPages: 1 });
};
const deleteJob = async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.id,
  });
  if (!job) {
    throw new BadRequestError('Bad request');
  }
  checkPermission(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: 'ok' });
};
const modifyJob = async (req, res) => {
  const { id } = req.params;
  const { company, jobSetting, jobStatus, jobType, officeLocation, position } =
    req.body;
  if (!position || !company) {
    throw new BadRequestError('Company and position are required');
  }

  let job = await Job.findOne({
    _id: id,
  });
  if (!job) {
    throw new NotFoundError(`Job not found with id ${id}`);
  }
  checkPermission(req.user, job.createdBy);
  // const updatedJob = await Job.findOneAndUpdate({_id:id},req.body, {
  //   new:true,
  //   runValidators:true
  // })
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
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  res.status(StatusCodes.OK).json({ stats, hits: stats.length });
};

export { showStats, getAllJobs, createJob, modifyJob, deleteJob };
