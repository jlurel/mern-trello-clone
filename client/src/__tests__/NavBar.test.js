import NavBar from "../components/NavBar";
import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
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

describe("NavBar", () => {
  test("should render without crash", async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
      container
    );

    const button = screen.getByTestId("logout");
    expect(button.innerHTML).toBe("Logout");
  });
});
