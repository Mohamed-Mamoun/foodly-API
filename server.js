const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const categoryRouter = require('./routes/categoryRouter');

const app = express();
const port = process.env.PORT || 6013;

dotenv.config();

// -> CONNECT DB
mongoose.connect(process.env.MONGOURL)
.then(()=> console.log(' -> Dataabse Connected'))
.catch((err)=> console.log(err));

// -> MIDDILEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/categories",categoryRouter);

app.listen(port, ()=> console.log(`Server is Running on ${port}`));

