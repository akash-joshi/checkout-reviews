import { screen, render } from "@testing-library/react";
import { Reviews } from "~/components/Reviews";

jest.mock("next/router", () => require("next-router-mock"));

describe("Review", () => {
  it("should render reviews correctly", () => {
    render(
      <Reviews
        reviews={[
          {
            comment: "This is a test",
            createdAt: new Date().toISOString(),
            email: "test@email.com",
            id: "123",
            name: "ADS",
            rating: 3,
          },
        ]}
      />
    );

    expect(screen.getByText(/This is a test/)).toBeInTheDocument();
  });
});
