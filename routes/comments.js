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

const CommentSchema = new Schema({
  _id: ObjectId,
  Name: String,
  Comment: String,
  Date: Number
});

const CommentModel = mongoose.model('comment', CommentSchema);

router.post("/comments", (req,res) => {
  console.log(req.body);
  let date = new Date();
  let postDate = date.getTime();
  let newComment = {
    _id: mongoose.Types.ObjectId(),
    Name: req.body.name,
    Comment: req.body.comment,
    Date: postDate
  }
  let newCommentModel = new CommentModel(newComment);
  newCommentModel.save((err) => {
    if (err) {
      return handleError(err);
    }
  });
  res.send({ created: true });
})

router.get("/comments", (req,res) => {
  console.log(req.query);
  CommentModel.find({},
    (err, comments) => {
      if (err) {
        return handleError(err);
      }
      if (!comments) {
        res.status(201).json({ comments: [] });
      } else {
        res.status(201).json({ comments: comments });
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
