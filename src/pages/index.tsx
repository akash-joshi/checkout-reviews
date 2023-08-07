import { Button, Input, TextInput, Title } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEventHandler, useState } from "react";
import StarRatings from "~/components/StarRatings";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  // @todo - this could be encapsulated in a form-validation library
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [starError, setStarError] = useState<string | null>(null);
  const [formError, setFormError] = useState(false);

  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setStarError(null);
    setFormError(false);

    if (isLoading) return;

    if (rating < 1) return setStarError("Rating must be at least 1");

    setIsLoading(true);

    void fetch("/api/submitReview", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        name,
        email,
        comment,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setIsLoading(false);

        // @todo - Might not be the best UX, but a user wouldn't see a success alert anyways because of the redirect. Maybe waiting for a few seconds for the user to understand that their submission was successful is better.
        void router.push("/reviews");
      });
  };

  return (
    <>
      <Head>
        <title>Checkout Reviews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl p-4">
        <Title order={1}>Feedback Form</Title>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2 md:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-4">
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                required
              />
              <TextInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                required
              />
              <Input.Wrapper error={starError}>
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
                <Input.Label htmlFor="review-comment" required>
                  Comment
                </Input.Label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border-solid-1 h-full w-full rounded border-[#ced4da] p-2"
                  id="review-comment"
                  required
                />
              </Input.Wrapper>
            </div>
          </div>
          <div className="mt-2 flex flex-col items-end gap-2">
            <Button disabled={isLoading} loading={isLoading} type="submit">
              Submit
            </Button>
            {formError && (
              // @todo This could probably be a modal or a toast.
              <Input.Error>
                There was an error submitting the form. Please try again later,
                or contact support at{" "}
                <Link href="mailto:checkout@thewriting.dev">
                  checkout@thewriting.dev
                </Link>
                .
              </Input.Error>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
