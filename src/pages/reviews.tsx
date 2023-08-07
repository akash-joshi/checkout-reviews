import { Button, Title } from "@mantine/core";
import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Reviews } from "~/components/Reviews";
import { prisma } from "~/server/db";

export default function ReviewsPage({
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
      <div className="mx-auto max-w-4xl p-4">
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
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ratings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Title order={2}>Latest Comments</Title>
        <Reviews reviews={reviews} />
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
      orderBy: {
        createdAt: "desc",
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
