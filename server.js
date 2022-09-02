import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import morgan from 'morgan';

const port = process.env.PORT || 5000;
import connectDB from './db/connect.js';

//middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());

import authUserMiddleware from './middleware/auth.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

//routes
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authUserMiddleware, jobsRouter);

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'hello' });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log('listening');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
