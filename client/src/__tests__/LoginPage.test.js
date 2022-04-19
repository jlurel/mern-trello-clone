import LoginPage from "../pages/LoginPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("LoginPage", () => {
  test("should render form", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Log in to Trello")).toBeInTheDocument();
  });
});
