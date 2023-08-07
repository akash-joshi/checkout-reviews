import React from "react";
import StarRatings from "./StarRatings";
import { Divider, Title } from "@mantine/core";
import { type InferGetServerSidePropsType } from "next";
import { type getServerSideProps } from "~/pages/reviews";

export const Reviews = ({
  reviews,
}: {
  reviews: InferGetServerSidePropsType<typeof getServerSideProps>["reviews"];
}) => {
  return (
    <div>
      {reviews.map((review, index) => (
        <React.Fragment key={review.id}>
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
        </React.Fragment>
      ))}
    </div>
  );
};
