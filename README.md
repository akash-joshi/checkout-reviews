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

## What could be made better?
