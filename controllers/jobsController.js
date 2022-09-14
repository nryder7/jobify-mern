import mongoose from 'mongoose';
import moment from 'moment';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import checkPermission from '../utils/checkPermissions.js';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js';
import { query } from 'express';

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
  const {
    company,
    officeLocation,
    position,
    jobSetting,
    search,
    status,
    jobType,
    sort,
    page = 1,
    limit = 10,
  } = req.query;
  console.log(sort);

  const skip = (Number(page) - 1) * Number(limit);

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (company) {
    queryObject.company = { $regex: company, $options: 'i' };
  }
  if (position) {
    queryObject.position = { $regex: position, $options: 'i' };
  }
  if (officeLocation) {
    queryObject.officeLocation = { $regex: officeLocation, $options: 'i' };
  }

  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (jobType && jobType !== 'all') {
    queryObject.type = jobType;
  }
  if (jobSetting && jobSetting !== 'all') {
    queryObject.setting = jobSetting;
  }

  let result = Job.find(queryObject);

  if (sort === 'created.new') {
    result = result.sort('-createdAt');
  }
  if (sort === 'created.old') {
    result = result.sort('createdAt');
  }
  if (sort === 'position.a') {
    result = result.sort('position');
  }
  if (sort === 'position.z') {
    result = result.sort('-position');
  }
  if (sort === 'company.a') {
    result = result.sort('company');
  }
  if (sort === 'company.z') {
    result = result.sort('-company');
  }

  result = result.skip(skip).limit(limit);
  const jobs = await result;

  const hits = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(hits / limit);
  if (!jobs) {
    throw new BadRequestError('No jobs found');
  }
  res.status(StatusCodes.OK).json({ jobs, hits, numOfPages });
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
  stats = stats.reduce(
    (acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    },
    //set default to zero. will not exist if not found with aggregate
    { pending: 0, interview: 0, declined: 0 }
  );

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    //moment 0 index
    // month 0-11 vs mongo 1-12
    //sort by last 6 months
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();
  //reverse so charts can read oldest first
  res.status(StatusCodes.OK).json({ stats, monthlyApplications });
};

export { showStats, getAllJobs, createJob, modifyJob, deleteJob };
