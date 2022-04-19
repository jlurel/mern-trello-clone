import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "../components/LoginForm";

describe("Register Form component", () => {
  test("rendering and submitting form", async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "email@test.com");
    await user.type(screen.getByLabelText(/password/i), "ewe@2ERodsW%");

    await user.click(screen.getByTestId(/login/i));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
