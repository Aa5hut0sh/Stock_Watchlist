const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");


if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}
const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1),
  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .regex(/[A-Z]/, "One uppercase required")
    .regex(/[0-9]/, "One number required")
    .regex(/[^A-Za-z0-9]/, "One special character required"),
});

const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password required"),
});

const signupController = async (req, res, next) => {
  try {
    const body = req.body;

    const { success } = signupSchema.safeParse(body);
    if (!success) {
      return res.status(400).json({
        message: "Invalid input data",
      });
    }

    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already taken",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);

    const newUser = await User.create({
      name: body.name,
      email: body.email,
      password: hash,
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    res.json({
      message: "User created successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};

const signinController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { success } = signinSchema.safeParse({ email, password });
    if (!success) {
      return res.status(400).json({
        message: "Invalid input data",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({
      message: "Signin successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signinController,
  signupController,
};
