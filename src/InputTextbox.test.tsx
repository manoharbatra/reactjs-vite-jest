// InputTextbox.test.tsx
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import InputTextbox from "./InputTextbox";

describe("InputTextbox component", () => {
  it("initial empty the input box", () => {
    render(<InputTextbox />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
  });

  it("displays entered text correctly after clicking the button", () => {
    render(<InputTextbox />);
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Display");
    fireEvent.change(input, { target: { value: "Hello, world!" } });
    fireEvent.click(button);
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("displays empty input after clicking the button", async () => {
    render(<InputTextbox />);
    const button = screen.getByRole("button", { name: "Display" });
    fireEvent.click(button);
    const inputbox_element = screen.getByTestId("text_box");
    expect(inputbox_element).toHaveValue("");
  });

  it("does not display entered text before clicking the button", () => {
    render(<InputTextbox />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello, world!" } });
    expect(screen.queryByText("Hello, world!")).toBeNull();
  });

  it("displays only the last entered text after clicking the button", () => {
    render(<InputTextbox />);
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Display");
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.change(input, { target: { value: "Goodbye" } });
    fireEvent.click(button);
    expect(screen.queryByText("Hello")).toBeNull();
    expect(screen.getByText("Goodbye")).toBeInTheDocument();
  });

  // Add more test cases as needed
});
