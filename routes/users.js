const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const connection = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio", { useNewUrlParser: true  });

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
    username: req.body.username
  };
  const salt = (newUser.username[0].charCodeAt() % 5) + 5;
  bcrypt.hash(req.body.password, salt, (err, passwordHash) => {
    console.log(passwordHash);
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
          newUser.password = passwordHash;
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
})

router.get("/user", (req,res) => {
  UserModel.findOne({ "email": req.query.email },
    (err, user) => {
      if (err) {
        console.log(err);
      }
      if (!user) {
        res.send({ exists: false });
      } else {
        bcrypt.compare(req.query.password, user.password, (err, correct) => {
          if (correct) {
            res.send({ username: user.username, exists: true });
          } else {
            console.log(req.query, user);
            res.send({ exists: false });
          }
        })
      }
  });
})

const userRouter = router;
module.exports = {
  userRouter,
  UserModel
};
