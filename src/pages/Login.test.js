import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  test("renders login form", () => {
    render(<Login />);

    // Check if "User Name" label is present
    const userNameLabel = screen.getByText("User Name");
    expect(userNameLabel).toBeInTheDocument();

    // Check if "Password" label is present
    const passwordLabel = screen.getByText("Password");
    expect(passwordLabel).toBeInTheDocument();

    // Check if "Log In" button is present
    const loginButton = screen.getByRole("button", { name: /Log In/i });
    expect(loginButton).toBeInTheDocument();
  });

  test("allows user input", () => {
    render(<Login />);

    // Type into the "User Name" input field
    const userNameInput = screen.getByPlaceholderText("UserName");
    fireEvent.change(userNameInput, { target: { value: "testuser" } });
    expect(userNameInput.value).toBe("testuser");

    // Type into the "Password" input field
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    expect(passwordInput.value).toBe("testpassword");
  });

  // Add more tests for form submission and other interactions as needed
});
