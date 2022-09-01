import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js';

const register = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const duplicateEmail = await User.findOne({ email });
  if (duplicateEmail) {
    throw new BadRequestError('Email already in use');
  }
  const user = await User.create(req.body);
  const token = user.createJWT();
  return res.status(StatusCodes.CREATED).json({
    user: { email, name, location: user.location, lastName: user.lastName },
    token,
  });
};
const login = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    throw new BadRequestError('Must provide all values');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email,
      name: user.name,
      location: user.location,
      lastName: user.lastName,
    },
    token,
  });
};
const update = async (req, res) => {
  res.send('update');
};

export { register, login, update };
