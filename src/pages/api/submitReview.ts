import { type Review } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";

const submitReview = async (req: NextApiRequest, res: NextApiResponse) => {
  // @todo It would be great to have run-time input validation here with a library like zod
  const { rating, name, comment, email } = req.body as Review;

  const review = await prisma.review.create({
    data: {
      name,
      rating,
      comment,
      email,
    },
  });

  res.status(200).json({ review });
};

export default submitReview;
