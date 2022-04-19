import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RegisterForm from "../components/RegisterForm";

describe("Register Form component", () => {
  test("rendering and submitting form", async () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId(/firstname/i), "firstname");
    await user.type(screen.getByTestId(/lastname/i), "lastname");
    await user.type(screen.getByTestId(/email/i), "email@test.com");
    await user.type(screen.getByTestId("password"), "ewe@2ERodsW%");
    await user.type(screen.getByTestId("confirmPassword"), "ewe@2ERodsW%");

    await user.click(screen.getByTestId(/register/i));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
  });

  test("password do not match", async () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId(/firstname/i), "firstname");
    await user.type(screen.getByTestId(/lastname/i), "lastname");
    await user.type(screen.getByTestId(/email/i), "email@test.com");
    await user.type(screen.getByTestId("password"), "ewe@2ERodsW%");
    await user.type(screen.getByTestId("confirmPassword"), "aba@2ERodfW%");

    await user.click(screen.getByTestId(/register/i));

    await waitFor(() => {
      expect(screen.getByText("Passwords must match")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(0);
    });
  });
});
