// Registering a new User
import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

//register new user
export const registerUser = async (req, res) => {
  const {username} = req.body;
  const salt = await bcrypt.genSalt(10); //After setting the number of non-crypt digits, create a salt and execute it using genSalt.
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);

  try {
    //check exist
    const oldUser = await UserModel.findOne({username});

    if (oldUser) {
      return res.status(400).json({message: "User already exists"})
    }

    const user = await newUser.save()
    const token = jwt.sign(
      {
        username: user.username, id: user._id
      },
      process.env.JWTKEY,
      {
        expiresIn: "1h"
      }
    );
    res.status(200).json({user, token});
  } catch (e) {
    console.log("This is error")
    res.status(500).json({message: e.message});
  }
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password)
      if (!validity) {
        console.log("same")
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};