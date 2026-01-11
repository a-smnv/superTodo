import { useState } from "react";
import "./App.css";
import backgroundImg from "./assets/background_img.jpg";
import TodoItem from "./components/todoItem/TodoItem";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  //состояние для списка задач
  const [todoList, setTodoList] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write Todo App", completed: false },
  ]);
  //состояние для нового текста задачи
  const [newTodo, setNewTodo] = useState("");

  //добавление новой задачи
  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodoList([...todoList, todo]);
    setNewTodo("");
  };
  // Переключение статуса выполнения
  const togleTodo = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  // Удаление задачи
  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };
  return (
    <div
      style={{
        // maxWidth: "500px",
        // margin: "0 auto",
        width:'100vw',
        height:'100vh',
        padding: "20px",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat'
      }}
    >
      <div style={{maxWidth: "500px",margin: '50px auto 0 auto'}}>
      <h1> To-Do List</h1>
      <div style={{ margin: "20px 0 20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo..."
          style={{ padding: "8px", marginRight: "10px", width: "300px" }}
        />
        <button onClick={addTodo} style={{ padding: "8px 16px" }}>
          Add
        </button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={togleTodo}
          onDelete={deleteTodo}
          />
          
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
