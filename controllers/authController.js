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
  const { name, lastName, email, location } = req.body;
  if (!email || !name) {
    throw new BadRequestError('Name and email are required');
  }
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new BadRequestError('Something went wrong');
  }

  if (
    user.name === name &&
    user.lastName === lastName &&
    user.email === email &&
    user.location === location
  ) {
    throw new BadRequestError('Nothing changed...');
  }
  user.name = name || user.name;
  user.lastName = lastName;
  user.email = email || user.email;
  user.location = location;
  await user.save();
  const token = user.createJWT();
  res.json({ token, user: { name, lastName, email, location } });
};

export { register, login, update };
