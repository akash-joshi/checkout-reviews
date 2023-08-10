# Checkout Reviews

This app demonstrates functionality described in the challenge. The main pages are:
1. `index.tsx`
  - Containing the main submission form, which allows users to submit a review.
3. `reviews.tsx`
  - Displaying a bar graph showing the ratings spread of all reviews received so far. A bar graph was chosen here because it's the simplest way to understand the difference between fixed data points visually. It also instills familiarity in the customers, so they know what to look out for when they go to a product's reviews page.
  - Displaying the reviews received for the product so far in a descending order sorted by creation date. This allows end-users to quickly judge the usefulness of reviews.

The components used are:
1. `Reviews` - a component responsible for displaying the reviews on the page. This helps us test the reviews page better as well.
2. `Star` - an SVG for a star with hover animations and `StarRatings` - a component which renders `Star` and controls its state.

## Steps to Run

1. `npm i`
2. `npx prisma migrate dev`
3. `npm run dev`

## Technology Choices

1. [`next`](https://nextjs.org/) - a React meta-framework taking care of several important things like routing, Server-Side Rendering, etc.
2. [`mantine`](https://mantine.dev/) - a React component library, taking care of accessibility and other important considerations while providing a good fundamental design system to build on.
3. [`recharts`](https://recharts.org/en-US/) - a React charting library using D3 to render graphs and charts.
4. `tailwind` - providing fundamental CSS utilities to improve speed of developement.
5. `jest` - the standard JS testing framework created by Facebook. Easy to use and debug.

## What could be made better?

1. Using a form-validation library to encapsulate form state in React.
2. Using something like Docker for standardizing dependencies used by the application, defending against the "It works on my machine" problem.
3. Adding better effects to form submission, making it clearer for the end user about the submission of the review.
4. Paginating responses from the backend so we can limit the number of elements returned at once.
5. Add run-time validation to APIs using zod.
6. Add CI for running type-checks, linting and tests before merging a PR.

