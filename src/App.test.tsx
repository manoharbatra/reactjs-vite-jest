// import { describe, expect, it } from "vitest";
// because we have added globals: true in vite.config.ts and "types": ["vitest/globals"], in tsconfig.json

import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { server } from "./mocks/node";
import { handlers } from "./mocks/handlers";

// describe("Test", () => {
//   it("testing the vitest", () => {
//     expect(true).toBeTruthy;
//   });
// });

describe("App", () => {
  it("checking whether text is available", () => {
    render(<App />);
    const text = screen.getByText("Vite + React");
    expect(text).toBeInTheDocument();
  });

  it("click button", async () => {
    render(<App />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/count is 1/i)).toBeInTheDocument();
  });

  it("api success scenario on load", async () => {
    render(<App />);
    expect(await screen.findByText("Todos List : 30")).toBeInTheDocument();
  });

  it("api error scenario on load", () => {
    render(<App />);
    server.use(
      http.get("https://dummyjson.com/todos", () => {
        return new HttpResponse(null, { status: 401 });
      })
    );
    expect(screen.queryByText("Todos List")).not.toBeInTheDocument();
  });
});
