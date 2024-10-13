import { NextFunction, Request, Response } from "express";
import { ApiReponse, Code } from "../utils/response";
import jwt from "jsonwebtoken";
import { log } from "console";

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationToken = req.headers.authorization;

  if (!authorizationToken) {
    res.json(new ApiReponse(Code.UserError, {}, "No Token found"));
    return;
  }

  const token = authorizationToken.split(" ")[1];

  try {
    const verify = await jwt.verify(token, process.env.JWT_SECRET!);

    req.body.user = verify;

    next();
  } catch (e) {
    res.json(new ApiReponse(Code.UserError, {}, "Invalid token provided"));
    return;
  }
};
