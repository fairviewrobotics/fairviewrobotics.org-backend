import express from 'express';
import asyncMid from '../helper/asyncMid';
import User from './user.model';
import { compare } from 'bcryptjs';
import boom from 'boom';
import joi from 'joi';
import validate from '../helper/validate';
import config from '../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const badLoginResponse = 'Username/password was not found.';

export const loginDto = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
}).required();

router.post('/login', validate(loginDto), asyncMid(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    throw boom.badRequest(badLoginResponse);
  }
  const passwordMatches = await compare(password, user.password);
  if (!passwordMatches) {
    throw boom.badRequest(badLoginResponse); 
  }
  return res.json({
    success: true,
    message: 'Successfully created login token',
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: jwt.sign({ _id: user._id }, config.get('jwt.secret'), { expiresIn: config.get('jwt.expire') })
    }
  });
}));

const registerDto = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required()
}).required();

router.post('/register', validate(registerDto), asyncMid(async (req, res) => {
  const { username, password, email } = req.validatedBody;
  const user = await User.findOne().or([ { username }, { email } ]).exec();
  if (!!user) {
    let message = 'Username already taken';
    if (user.username === username && user.email === email) {
      message = 'Username/email already taken';
    } else if (user.email === email) {
      message = 'Email already taken';
    }
    
    throw boom.badRequest(message);
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    username,
    password: hashedPassword,
    email
  });

  return res.json({
    success: true,
    message: 'Successfully registered',
    data: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    }
  });
}));

export default router;