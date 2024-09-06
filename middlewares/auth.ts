import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access Denied",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
