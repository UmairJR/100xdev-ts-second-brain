import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string;
}

export const userAuthMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Invalid token - Not Logged In",
        });
      } else {
        req.userId = (decoded as { id: string }).id;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "No token provided",
    });
  }
}