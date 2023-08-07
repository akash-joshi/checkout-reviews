import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import Home from "~/pages";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("Home", () => {
  it("should redirect on form submission", () => {
    render(<Home />);

    const nameInput = screen.getByLabelText(/Name/);
    fireEvent.change(nameInput, { target: { value: "Test Value" } });

    const emailInput = screen.getByLabelText(/Email/);
    fireEvent.change(emailInput, { target: { value: "asd@asd.com" } });

    const commentInput = screen.getByLabelText(/Comment/);
    fireEvent.change(commentInput, { target: { value: "This is a review" } });

    const ratingsInput = screen.getAllByTestId("star");
    fireEvent.click(ratingsInput[2] as Element);

    const submitButton = screen.getByText(/Submit/);
    fireEvent.click(submitButton);

    const mockRouter = {
      push: jest.fn(), // the component uses `router.push` only
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    expect(mockRouter.push).toHaveBeenCalledWith("/reviews");
  });
});
