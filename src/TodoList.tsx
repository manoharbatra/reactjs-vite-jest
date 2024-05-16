import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  todo: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // New state to track loading status

  useEffect(() => {
    if (loading) {
      fetchTodos(); // Fetch todos only if loading is true
    }
  }, [loading]); // Run the effect only when loading changes

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos");
      const data = await response.json();
      setTodos(data);
      setLoading(false); // Set loading to false after fetching todos
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.length &&
          todos.map((todo) => <li key={todo.id}>{todo.todo}</li>)}
      </ul>
    </div>
  );
};

export default TodoList;
