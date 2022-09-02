import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Invalid authentication');
  }
  try {
    const payload = jwt.verify(
      authHeader.split(' ')[1],
      process.env.JWT_SECRET
    );
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Invalid authentication');
  }
};
export default auth;
