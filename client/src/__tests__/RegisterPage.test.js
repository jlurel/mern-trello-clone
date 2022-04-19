import RegisterPage from "../pages/RegisterPage";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("RegisterPage", () => {
  test("should render form", async () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Create an account")).toBeInTheDocument();
  });
});
