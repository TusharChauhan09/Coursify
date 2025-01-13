const { Router } = require("express");

const courseRouter = Router();

const {courseModel} = require('../db');

courseRouter.post("/purchase", (req, res) => {
    res.json({
      message: "purchase",
    });   
});

courseRouter.get("/preview", (req, res) => {
    res.json({
      message: "preview",
    }); 
});


module.exports = {
  courseRouter
};
