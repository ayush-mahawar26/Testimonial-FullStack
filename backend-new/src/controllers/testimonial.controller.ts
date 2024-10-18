import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { testimonialBody, testimonialType } from "../types/testimonial.type";
import { log } from "console";
import { authMiddleWare } from "../middleware/auth.middleware";
import { ApiReponse } from "../utils/response";
import { create } from "domain";
import test from "node:test";

export const testimonialRoute = express.Router();

const prisma: PrismaClient = new PrismaClient();

// get all the route
testimonialRoute.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params["id"];

  if (!id) {
    res.json(new ApiReponse(400, {}, "No projectId provided"));
    return;
  }

  const allTestimonials = await prisma.testimonial.findMany({
    where: {
      projectsId: id,
    },
  });

  if (!allTestimonials) {
    res.json(new ApiReponse(500, {}, "Server Error Occured"));
    return;
  }

  res.json(
    new ApiReponse(
      200,
      {
        testimonials: allTestimonials,
      },
      "Testimonial Fetched"
    )
  );
});

// add testimonials
testimonialRoute.post("/:id", async (req: Request, res: Response) => {
  const body: testimonialType = req.body;
  console.log(body);

  const projectId = req.params["id"];
  console.log(projectId);

  const mailCheck = await prisma.testimonial.findMany({
    where: {
      AND: {
        email: body.email,
        projectsId: projectId,
      },
    },
  });

  if (mailCheck.length > 0) {
    res.json(new ApiReponse(400, {}, "Review Already given with this email"));
    return;
  }

  if (testimonialBody.safeParse(body)) {
    const testimonial = await prisma.testimonial.create({
      data: {
        projectsId: projectId,
        email: body.email,
        authorname: body.authorname,
        title: body.title,
        description: body.description,
        socialLink: body.socialLink,
      },
    });

    if (!testimonial) {
      res.json(new ApiReponse(500, {}, "Server Error"));
    }

    res.json(
      new ApiReponse(
        200,
        {
          testimonial,
        },
        "created testinmonial"
      )
    );
    return;
  } else {
    res.json(new ApiReponse(400, {}, "Invalid Input"));
  }
});

// update the post like
testimonialRoute.put("/:tid", async (req: Request, res: Response) => {
  const tid = req.params["tid"];

  const val = await prisma.testimonial.findUnique({
    where: {
      id: tid,
    },
  });

  if (!val) {
    res.json(new ApiReponse(400, {}, "No Id found"));
    return;
  }

  const liked = val.isLiked;
  prisma.testimonial
    .update({
      where: {
        id: tid,
      },
      data: {
        isLiked: !liked,
      },
    })
    .then((data) => {
      res.json(new ApiReponse(200, { data }, "Updated like"));
    })
    .catch((e: Error) => {
      res.json(new ApiReponse(500, {}, e.message));
    });
});
