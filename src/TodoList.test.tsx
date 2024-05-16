// TodoList.test.tsx
import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import TodoList from "./TodoList";

// Define mock API response
const mockTodos = [
  {
    id: 1,
    todo: "Do something nice for someone I care about",
    completed: true,
    userId: 26,
  },
  {
    id: 2,
    todo: "Do something nice for someone I care about",
    completed: true,
    userId: 27,
  },
];

const server = setupServer(
  http.get("https://dummyjson.com/todos", () => {
    return HttpResponse.json(mockTodos);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("TodoList", () => {
  it("renders todos fetched from API", async () => {
    render(<TodoList />);

    // Wait for todos to be fetched and rendered
    await new Promise((resolve) => setTimeout(resolve, 0));

    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems).toHaveLength(mockTodos.length);

    mockTodos.forEach((todo) => {
      expect(screen.getAllByText(todo.todo));
    });
  });

  //   it("renders error message on fetching error", async () => {
  //     // Mock error response
  //     server.use(
  //       http.get(
  //         "https://jsonplaceholder.typicode.com/todos",
  //         (
  //           req: any,
  //           res: (arg0: any) => any,
  //           ctx: { status: (arg0: number) => any }
  //         ) => {
  //           return res(ctx.status(500));
  //         }
  //       )
  //     );

  //     render(<TodoList />);

  //     // Wait for potential error to be displayed
  //     await new Promise((resolve) => setTimeout(resolve, 0));

  //     expect(screen.getByText(/Error fetching todos:/i)).toBeInTheDocument();
  //   });
});
