import express from 'express';
const router = express.Router();

import {
  getAllJobs,
  showStats,
  createJob,
  modifyJob,
  deleteJob,
} from '../controllers/jobsController.js';

router.route('/').get(getAllJobs).post(createJob);
router.route('/stats').get(showStats);
router.route('/:id').patch(modifyJob).delete(deleteJob);

export default router;
