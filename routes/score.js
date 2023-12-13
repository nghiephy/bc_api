var express = require("express");
var router = express.Router();
var fetch = require('node-fetch');
const fs = require("fs");

// reading a JSON file asynchronously
function getAllScore() {
  fs.readFile("public/assets/data/score.json", (error, data) => {
    // if the reading process failed,
    // throwing the error
    if (error) {
      // logging the error
      console.error(error);
  
      throw err;
    }
  
    // parsing the JSON object
    // to convert it to a JavaScript object
    const score = JSON.parse(data);

    console.log("data", JSON.stringify(score));

    // printing the JavaScript object
    // retrieved from the JSON file
    return JSON.stringify(score);
  });
}

// Get all score
router.get("/", function (req, res, next) {
  fs.readFile("public/assets/data/score.json", (error, data) => {
    // if the reading process failed,
    // throwing the error
    if (error) {
      // logging the error
      console.error(error);
  
      throw err;
    }
  
    // parsing the JSON object
    // to convert it to a JavaScript object
    const score = JSON.parse(data);

    // printing the JavaScript object
    // retrieved from the JSON file
    res.json({ data: score });
  });
});

// Add new score
router.post("/add", function (req, res, next) {
  const reqData = req.body;
  
  fs.readFile("public/assets/data/score.json", (error, data) => {
    if (error) {
      console.error(error);
      throw err;
    }
  
    const score = JSON.parse(data);
    score.push({ name: reqData.name, credits: parseInt(reqData.credits), score: parseFloat(reqData.score) });
    fs.writeFile("public/assets/data/score.json", JSON.stringify(score), (error) => {
      if (error) {
        console.error(error);
        throw error;
      }
      res.json({ newScore: score });
    });
  });
});

// Update new score
router.post("/update", function (req, res, next) {
  const reqData = req.body;
  
  fs.readFile("public/assets/data/score.json", (error, data) => {
    if (error) {
      console.error(error);
      throw err;
    }
  
    const score = JSON.parse(data);
    const newScore = { name: score[reqData.index].name, credits: parseInt(reqData.credits), score: parseFloat(reqData.score) }
    score.splice(reqData.index, 1, newScore);
    fs.writeFile("public/assets/data/score.json", JSON.stringify(score), (error) => {
      if (error) {
        console.error(error);
        throw error;
      }
      res.json({ newScore: score });
    });
  });
});

// Delete score
router.post("/delete", function (req, res, next) {
  const reqData = req.body;
  
  fs.readFile("public/assets/data/score.json", (error, data) => {
    if (error) {
      console.error(error);
      throw err;
    }
  
    const score = JSON.parse(data);
    const deletedScore = score.splice(reqData.index, 1);
    if (deletedScore.length > 0) {
      fs.writeFile("public/assets/data/score.json", JSON.stringify(score), (error) => {
        if (error) {
          console.error(error);
          throw error;
        }
        res.json({ newScore: score });
      });
    } else {
        res.status(400).json({ message: "Wrong index!" });
    }
  });
});

module.exports = router;
