import type { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter Your Email and Password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "The email or password is incorrect. Please try again!",
      });
    }

    //compare password user with hashpassword
    const isPasswordValid = await Bun.password.verify(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({
        success: false,
        message: "invalid password",
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "secret");

    // res.setHeader("authorization", `Bearer ${token}`);

    res.status(200).json({
      success: true,
      message: "User Autenticate Successfully",
      userId: user._id,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  const { nama, email, jenis_kelamin, password } = req.body;

  // check if the request body is empty
  if (!nama || !email || !jenis_kelamin || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  try {
    // check if the email is already registered
    const checkEmailRegistered = await User.findOne({
      email,
    });

    if (checkEmailRegistered) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    const newUser = new User({
      nama,
      email,
      jenis_kelamin,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Register success",
      data: {
        nama,
        email,
        jenis_kelamin,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const profile = async (req: Request, res: Response) => {
  const user = req.user as { id: string; email: string };

  try {
    const findUser = await User.findById(user.id);

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Profile",
      data: findUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
