import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase-client-config";

function App() {
  const [todoList, setTodoList] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch all todos when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("ToDoList").select("*");
      if (error) console.error("Error fetching todos:", error);
      else setTodoList(data);
    };

    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return; // Prevent empty input

    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };

    const { data, error } = await supabase.from("ToDoList").insert([newTodoData]).select().single();

    if (error) {
      console.log("Error adding todo:", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="New Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo Item</button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {todo.name} - {todo.isCompleted ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
