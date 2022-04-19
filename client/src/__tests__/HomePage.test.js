import HomePage from "../pages/HomePage";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("HomePage", () => {
  test("should render without crash", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  });
});
