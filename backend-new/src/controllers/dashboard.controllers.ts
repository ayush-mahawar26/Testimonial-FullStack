import express, { Request, Response } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { PrismaClient } from "@prisma/client";
import { ApiReponse, Code } from "../utils/response";
import { ProjectBody, ProjectBodyType } from "../types/project.type";
import { upload } from "../middleware/multer";
import { uploadToCloudinary } from "../utils/cloudinary";
import { log } from "console";

export const dashboardRouter = express.Router();
const prisma: PrismaClient = new PrismaClient();

dashboardRouter.use(authMiddleWare);

// get projects
dashboardRouter.get("/", async (req: Request, res: Response) => {
  const userid = req.body.user.id;

  const userProject = await prisma.user.findUnique({
    where: {
      id: userid,
    },
    select: {
      Projects: true,
    },
  });

  if (!userProject) {
    res.json(new ApiReponse(Code.UserError, {}, "Invalid user"));
    return;
  }

  res.json(
    new ApiReponse(
      Code.Success,
      {
        userProject,
      },
      "Successfully Fetched proejcts"
    )
  );
});

// get project by ID
dashboardRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);

  const project = await prisma.projects.findUnique({
    where: {
      id: id,
    },
  });

  if (!project) {
    res.json(new ApiReponse(500, {}, "Invalid project id"));
    return;
  }

  res.json(new ApiReponse(200, { project }, "get project"));
});

// add project
dashboardRouter.post(
  "/",
  upload.single("projectImg"),
  authMiddleWare,
  async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);

    if (ProjectBody.safeParse(body).success) {
      var uploadResponse;

      if (req.file) {
        uploadResponse = await uploadToCloudinary(req.file!.path);
        if (!uploadResponse) {
          res.json(
            new ApiReponse(Code.ServerError, {}, "Uploading image error")
          );
          return;
        }
      }

      const newProject = await prisma.projects.create({
        data: {
          projectname: body.projectName,
          description: body.description,
          headerTitle: body.headerTitle,
          userId: req.body.user.id,
          projectImg: !uploadResponse?.secure_url
            ? ""
            : uploadResponse.secure_url,
        },
      });

      res.json(
        new ApiReponse(
          Code.Success,
          {
            newProject,
          },
          "Project Created Successfully"
        )
      );
      return;
    }

    res.json(
      new ApiReponse(
        Code.UserError,
        {
          body,
        },
        "Invalid Input"
      )
    );
  }
);
