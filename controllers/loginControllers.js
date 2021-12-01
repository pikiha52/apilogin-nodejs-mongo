import Users from "../models/Users.js";
import bcrypt from "bcrypt";

export const signin = async (req, res) => {
  const body = new Users(req.body);
  const user = await Users.findOne({ username: body.username });
  if (user) {
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "Password salah" });
    }
  } else {
    res.status(401).json({ error: "User belum terdaftar" });
  }
};

export const signUp = async (req, res) => {
  const users = new Users(req.body);
  const checkUsername = await Users.findOne({ username: users.username });
  if (checkUsername == null) {
    const salt = await bcrypt.genSalt(10);
    users.password = await bcrypt.hash(users.password, salt);
    try {
      const signUp = await users.save();
      res.json(signUp);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.json({ message: "Username ini sudah digunakan" });
  }
};
