import express from 'express';
import dotenv from 'dotenv';

import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import user from './routes/user';
import auth from './routes/auth';


dotenv.config();

const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

app.use('/api/user',user);
app.use('/api/auth',auth);

app.listen(8001,()=>{
    console.log("Running on localhost:8001")
});