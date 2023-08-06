import { Button, Input, TextInput, Title } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import StarRatings from "~/components/StarRatings";

export default function Home() {
  const [rating, setRating] = useState(0);

  return (
    <>
      <Head>
        <title>Checkout Reviews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl p-4">
        <Title order={1}>Feedback Form</Title>
        <form>
          <div className="grid gap-2 md:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-4">
              <TextInput label="Name" required />
              <TextInput type="email" label="Email" required />
              <Input.Wrapper>
                <Input.Label required>Rating (1-5 Stars)</Input.Label>
                <StarRatings
                  selectable
                  rating={rating}
                  onChange={(rating) => setRating(rating)}
                  className={"rating-stars"}
                />
              </Input.Wrapper>
            </div>
            <div>
              <Input.Wrapper className="flex h-full flex-col">
                <Input.Label id="review-comment" required>
                  Comment
                </Input.Label>
                <textarea
                  className="border-solid-1 h-full w-full rounded border-[#ced4da]"
                  id="review-comment"
                  required
                />
              </Input.Wrapper>
              {/* <Textarea
                autosize
                label="Comment"
                className="h-full"
                required
              /> */}
            </div>
          </div>
          <div className="mt-2 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
}
