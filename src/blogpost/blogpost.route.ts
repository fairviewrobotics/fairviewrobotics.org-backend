import express from 'express';
import joi from 'joi';
import asyncMid from '../helper/asyncMid';
import validate from '../helper/validate';
import BlogPost from './blogpost.model';
import { authenticate } from '../auth/strategy';

const router = express.Router();

router.get('/', asyncMid(async (req, res) => {
  const posts = await BlogPost.find().exec();
  res.json({
    successful: true,
    data: posts
  });
}));

router.get('/:id', asyncMid(async (req, res) => {
  const post = await BlogPost.findById(req.param('id', ''));
  res.json({
    successful: true,
    data: post
  });
}));

const postDto = joi.object({
  name: joi.string().required(),
  markdown: joi.string().required()
}).required();

router.post('/', authenticate, validate(postDto), asyncMid(async (req, res) => {
  const newPost = await BlogPost.create(req.validatedBody);
  res.json({
    successful: true,
    data: newPost
  });
}));

const patchDto = joi.object({
  name: joi.string(),
  markdown: joi.string()
}).or('name', 'markdown');

router.patch('/:id', authenticate, validate(patchDto), asyncMid(async (req, res) => {
  const partialUpdate = await BlogPost.findOneAndUpdate({ _id: req.params('id', '') }, {
    $set: req.validatedBody
  }).exec();

  res.json({
    successful: true,
    data: partialUpdate
  })
}));

router.delete('/:id', authenticate, asyncMid(async (req, res) => {
  const details = await BlogPost.findByIdAndRemove(req.param('id', '')).exec();
  res.json({
    successful: true,
    data: details
  });
}));

export default router;