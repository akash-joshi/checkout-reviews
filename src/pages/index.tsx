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
      <div>
        <h1>Feedback Form</h1>
        <form>
          <div>
            <div>
              <div>
                <label>Name</label>
                <input type="text" placeholder="Name" />
              </div>
              <div>
                <label>Email</label>
                <input type="email" placeholder="Email" />
              </div>
              <div>
                <label>Rating (1-5 Stars)</label>
                <StarRatings
                  selectable
                  rating={rating}
                  onChange={(rating) => setRating(rating)}
                  className={"rating-stars"}
                />
              </div>
            </div>
            <div>
              <label>Comment</label>
              <textarea />
            </div>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
