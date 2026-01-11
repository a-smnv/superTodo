type TodoItemProps = {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      style={{
        marginBottom: "10px",
        padding: "10px",
        background: "#f5f5f5",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          style={{ marginRight: "10px" }}
        />
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#888" : "#000",
          }}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          background: "#ff4444",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "3px",
          cursor: "pointer",
          margin: "10px 0 10px",
        }}
      >
        Delete
      </button>
    </li>
  );
}
export default TodoItem;
