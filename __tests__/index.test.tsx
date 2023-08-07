import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import mockRouter from "next-router-mock";

import Home from "~/pages";

jest.mock("next/router", () => require("next-router-mock"));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: jest.fn(),
  })
) as jest.Mock;

describe("Home", () => {
  it("should redirect on form submission", async () => {
    act(() => {
      render(<Home />);
    });

    const nameInput = screen.getByLabelText(/Name/);
    fireEvent.change(nameInput, { target: { value: "Test Value" } });

    const emailInput = screen.getByLabelText(/Email/);
    fireEvent.change(emailInput, { target: { value: "asd@asd.com" } });

    const commentInput = screen.getByLabelText(/Comment/);
    fireEvent.change(commentInput, { target: { value: "This is a review" } });

    const ratingsInput = screen.getAllByTestId("star");
    fireEvent.click(ratingsInput[2] as Element);

    const submitButton = screen.getByText(/Submit/);
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/reviews",
      })
    );
  });
});
