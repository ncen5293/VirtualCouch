const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let databaseConnection = "Waiting for Database response...";

router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

const connection = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio", { useNewUrlParser: true  });
const database = mongoose.connection;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  _id: ObjectId,
  email: String,
  username: String,
  password: String,
  avatar: {}
});

const UserModel = mongoose.model('user', UserSchema);

router.post("/user", (req,res) => {
  let newUser = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  console.log(newUser);
  UserModel.findOne({
      $or: [
        {email: req.body.email},
        {username: req.body.username}]
    },
    (err, user) => {
      if (err) {
        console.log(err);
      }
      if (!user) {
        newUser._id = mongoose.Types.ObjectId();
        let newUserModel = new UserModel(newUser);
        newUserModel.save((err) => {
          if (err) {
            console.log(err);
          }
        });
        res.send({ username: newUser.username, error: false });
      } else {
        res.send({ error: true });
      }
    });
})

router.get("/user", (req,res) => {
  UserModel.findOne({ "email": req.query.email },
    (err, user) => {
      if (err) {
        console.log(err);
      }
      if (!user || (user && user.password !== req.query.password)) {
        res.send({ exists: false });
      } else if (user && user.password === req.query.password) {
        res.send({ username: user.username, exists: true });
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

const userRouter = router;
module.exports = {
  userRouter,
  UserModel
};
