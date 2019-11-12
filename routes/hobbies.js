const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let databaseConnection = "Waiting for Database response...";

router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio", { useNewUrlParser: true  });
const database = mongoose.connection;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const HobbySchema = new Schema({
  _id: ObjectId,
  Title: String,
  Likes: Number
});

const HobbyModel = mongoose.model('hobby', HobbySchema);

router.put("/hobbys/:title/like", (req,res) => {
  console.log(req.body);
  HobbyModel.findOneAndUpdate(
    { "Title": req.body.title },
    { "Likes": req.body.likeCounter + 1 },
    { new: true },
    (err, hobby) => {
      if (err) {
        return handleError(err);
      }
      if (!hobby) {
        console.log('creating new hobby');
        let newHobby = { Likes: 1, Title: req.query.title }
        newHobby._id = mongoose.Types.ObjectId();
        let newHobbyModel = new HobbyModel(newHobby);
        newHobbyModel.save((err) => {
          if (err) {
            return handleError(err);
          }
        });
        res.send({likes: newHobby.Likes});
      } else {
        res.send({likes: hobby.Likes});
      }
  });
})

router.get("/hobbys/:title/like", (req,res) => {
  console.log(req.query);
  HobbyModel.findOne({ "Title": req.query.title },
    (err, hobby) => {
      if (err) {
        return handleError(err);
      }
      if (!hobby) {
        console.log('creating new hobby');
        let newHobby = { Likes: 0, Title: req.query.title }
        newHobby._id = mongoose.Types.ObjectId();
        let newHobbyModel = new HobbyModel(newHobby);
        newHobbyModel.save((err) => {
          if (err) {
            return handleError(err);
          }
        });
        res.status(201).json({ error: null, likes: newHobby.Likes });
      } else {
        res.status(201).json({ error: null, likes: hobby.Likes });
      }
  });
})

database.on("error", error => {
    console.log("Database connection error:", error);
    databaseConnection = "Error connecting to Database";
});

// If connected to MongoDB send a success message
database.once("open", () => {
    console.log("Connected to Database!");
    databaseConnection = "Connected to Database";
});

module.exports = router;
