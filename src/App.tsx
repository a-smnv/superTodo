import { useState } from "react";
import "./App.css";
import backgroundImg from "./assets/background_img.jpg";
import TodoItem from "./components/todoItem/TodoItem";
import type { FilterType } from "./types/todo";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  //состояние для фильтра
  const[filter, setFilter]= useState<FilterType>('all')
  
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

  const handleKeyPress=(e: React.KeyboardEvent)=>{
    if(e.key === 'Enter'){
      addTodo();
    }
  }
   // Функция для фильтрации
const filteredTodos = todoList.filter(todo=>{
  if(filter === 'active') return !todo.completed;
   if (filter === 'completed') return todo.completed;
   return true;
})
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

//Статистика
const activeCount =  todoList.filter(todo=>!todo.completed).length
const completedCount = todoList.filter(todo=>todo.completed).length

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
          onKeyDown={handleKeyPress}
          placeholder="New todo..."
          style={{ padding: "8px", marginRight: "10px", width: "300px" }}
        />
        <div style={{ margin: '20px 0 ', display: 'flex', gap: '10px' }}>
          <button onClick={addTodo} >
          Add
        </button>
        <button onClick={()=> setFilter('all')} style={{ 
            padding: '8px 16px',
            background: filter === 'all' ? '#2196F3' : '#f0f0f0',
            color: filter === 'all' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>All ({todoList.length})</button>
        <button onClick={()=> setFilter('active')} style={{ 
            padding: '8px 16px',
            background: filter === 'active' ? '#2196F3' : '#f0f0f0',
            color: filter === 'active' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>Active ({activeCount})</button>
        <button onClick={()=> setFilter('completed')}    style={{ 
            padding: '8px 16px',
            background: filter === 'completed' ? '#2196F3' : '#f0f0f0',
            color: filter === 'completed' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>Completed ({completedCount})</button>
        </div>
      </div>
      {filteredTodos.length===0 ?(<div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#888',
          fontSize: '18px',
          background: '#f9f9f9',
          borderRadius: '8px'
        }}>
          {filter === 'all' && 'Нет задач. Добавьте первую!'}
          {filter === 'active' && 'Нет активных задач 🎉'}
          {filter === 'completed' && 'Нет завершенных задач'}
        </div>):(<ul>
        {filteredTodos.map((todo) => (
          <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={togleTodo}
          onDelete={deleteTodo}
          />
          
        ))}
      </ul>)}
      
      </div>
    </div>
  );
}

export default App;
