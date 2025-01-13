const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = mongoose.ObjectId;


// Schema 
//User
const user = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

//Admin
const admin = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

//Course
const course = new Schema({
  title: String,
  description: String,
  price: Number,
  createrId: ObjectId,
});

//Purchases
const purchases = new Schema({
    courseId: ObjectId,
    userId: ObjectId
});


//Model
const userModel = mongoose.model('User',user);

const adminModel = mongoose.model('Admin',admin); 

const courseModel = mongoose.model('Course',course);

const purchasesModel = mongoose.model('Purchases',purchases);


// Module Exports Models
module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchasesModel,
};
