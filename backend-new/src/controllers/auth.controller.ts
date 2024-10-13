import express from "express";
import {
  userSigninType,
  UserSignInZod,
  userSignupType,
  UserSignUpZod,
} from "../types/auth.type";
import { ApiReponse, Code } from "../utils/response";
import { log } from "console";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";

export const authRouter = express.Router();

const prisma: PrismaClient = new PrismaClient();

//Get user
authRouter.get("/", authMiddleWare, async (req: Request, res: Response) => {
  const userid: string = req.body.user.id;

  if (!userid) {
    res.json(new ApiReponse(500, {}, "Token not found"));

    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userid,
    },
    select: {
      useremail: true,
      username: true,
    },
  });

  if (!user) {
    res.json(new ApiReponse(500, {}, "Server Error"));
    return;
  }

  res.json(new ApiReponse(200, { user }, "User Fetched"));
});

// Sign in user
authRouter.post("/signin", async (req: Request, res: Response) => {
  const body: userSigninType = req.body;

  if (UserSignInZod.safeParse(body).success) {
    const user = await prisma.user.findUnique({
      where: {
        useremail: body.useremail,
      },
    });

    if (!user) {
      res.json(
        new ApiReponse(
          Code.UserError,
          {},
          "No user found , Try to create Account"
        )
      );
      return;
    }

    if (body.userpassword != user!.userpassword) {
      res.json(new ApiReponse(Code.UserError, {}, "Invalid Credentials"));
      return;
    }
    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign(
      {
        id: user!.id,
        email: user!.useremail,
      },
      secret,
      {
        expiresIn: "2 days",
      }
    );

    res.json(
      new ApiReponse(
        Code.Success,
        {
          user,
          token,
        },
        "User Signed in"
      )
    );
  } else {
    res.json(new ApiReponse(Code.UserError, {}, "Invalid Input"));

    return;
  }
});

authRouter.post("/signup", async (req: Request, res: Response) => {
  const body: userSignupType = req.body;

  if (UserSignUpZod.safeParse(body).success) {
    const user = await prisma.user.findUnique({
      where: {
        useremail: body.useremail,
      },
    });

    if (user) {
      res.json(new ApiReponse(Code.UserError, {}, "User Already Exist"));
      return;
    }

    const createUser = await prisma.user.create({
      data: {
        useremail: body.useremail,
        userpassword: body.userpassword,
        username: body.useremail,
      },
    });

    if (!createUser) {
      res.json(new ApiReponse(Code.UserError, {}, "ServerError"));
      return;
    }

    const sec = process.env.JWT_SECRET!;
    const token = jwt.sign(
      {
        id: createUser.id,
        email: createUser.useremail,
      },
      sec,
      {
        expiresIn: "2 days",
      }
    );

    res.json(
      new ApiReponse(
        Code.Success,
        {
          createUser,
          token,
        },
        "Signup Successfully"
      )
    );
  } else {
    res.json(new ApiReponse(Code.UserError, {}, "Invalid Input"));
  }
});
