import { UnauthenticatedError } from '../errors/index.js';

const checkPermission = (reqUser, resourceUserId) => {
  if (reqUser.userId === resourceUserId.toString()) return;
  if (reqUser.role === 'admin') return;
  throw new UnauthenticatedError('Insufficient permissions');
};

export default checkPermission;
