import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { MemoryRouter } from "react-router-dom";

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      console.log(store);
    },
  };
})();

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

describe("App", () => {
  test("should start at login page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
      container
    );

    expect(screen.getByText(/log in to trello/i)).toBeInTheDocument();
  });

  test("logout button should route to login page", async () => {
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    localStorageMock.setItem("token", "token");

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
      container
    );

    const logoutButton = screen.getByTestId("logout");
    expect(localStorageMock.getItem("token")).toBe("token");
    expect(window.location.pathname).toBe("/");
    fireEvent.click(logoutButton);
    expect(localStorageMock.getItem("token")).toBe(undefined);
    expect(screen.getByText(/log in to trello/i)).toBeInTheDocument();
  });
});
