require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const app = express();

const port =3000;

const {userRouter} = require('./routes/user');

const {courseRouter} = require('./routes/course');

const {adminRouter} = require('./routes/admin');

app.use(express.json());

app.use("/user", userRouter);

app.use("/course",courseRouter);

app.use('/admin',adminRouter);


const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log("Connected to MongoDB!");
    app.listen(port,()=>{
        console.log(`Listening on ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
connectDB();
