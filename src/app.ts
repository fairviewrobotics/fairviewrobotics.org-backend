import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import config from './config';
import strategy from './auth/strategy';
import authRoutes from './auth/auth.route';
import blogPostRoutes from './blogpost/blogpost.route';
import { notFound, error } from './error/error';

const app = express();

// Express config
app.use(cors());
app.use(bodyParser.json());

// Mongoose connect
mongoose.connect(config.get('db.uri'), { useNewUrlParser: true });

// Passport config
passport.use(strategy);

// Routes
app.use('/', authRoutes);
app.use('/blogpost', blogPostRoutes);

// Error/404
app.use(notFound);
app.use(error);

app.listen(config.get('port'), () => {
  console.log(`Listening on port ${config.get('port')}`);
});