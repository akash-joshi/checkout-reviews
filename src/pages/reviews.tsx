import { Button, Divider, Title } from "@mantine/core";
import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StarRatings from "~/components/StarRatings";
import { prisma } from "~/server/db";

export default function Home({
  reviewSpread,
  reviews,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const data = useMemo(() => {
    return reviewSpread.map((review, index) => ({
      name: `${index + 1} stars`,
      Ratings: review,
    }));
  }, [reviewSpread]);

  return (
    <>
      <Head>
        <title>Checkout Reviews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex justify-between">
          <Title order={1}>Feedback Results</Title>
          <Button
            onClick={() => {
              void router.push("/");
            }}
          >
            Go Back
          </Button>
        </div>
        <div className="mt-2 min-h-[300px]">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ratings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Title order={2}>Latest Comments</Title>
        <div>
          {reviews.map((review, index) => (
            <>
              {index > 0 && (
                <Divider className="mx-auto my-2 h-[2px] w-3/4 bg-[#ced4da]" />
              )}
              <div className="flex flex-col gap-2">
                <Title order={4}>
                  <b className="text-gray-400">{review.name}</b> on{" "}
                  {new Date(review.createdAt).toLocaleString("default", {
                    month: "long",
                  })}
                  , {new Date(review.createdAt).getFullYear()}
                </Title>
                <StarRatings rating={review.rating} />
                <div>
                  {review.comment.split("\n").map((text, index) => (
                    <p className="my-1" key={index}>
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // @todo - work on pagination eventually
  const reviews = (
    await prisma.review.findMany({
      select: {
        id: true,
        comment: true,
        rating: true,
        email: true,
        createdAt: true,
        name: true,
      },
    })
  ).map((review) => ({
    ...review,
    // parse date safely
    createdAt: review.createdAt.toString(),
  }));

  const reviewSpread = [
    await prisma.review.count({ where: { rating: 1 } }),
    await prisma.review.count({ where: { rating: 2 } }),
    await prisma.review.count({ where: { rating: 3 } }),
    await prisma.review.count({ where: { rating: 4 } }),
    await prisma.review.count({ where: { rating: 5 } }),
  ];

  return {
    props: {
      reviews,
      reviewSpread,
    },
  };
}
