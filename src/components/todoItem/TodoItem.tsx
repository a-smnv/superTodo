import type { ITodo } from '../../types/todo';
import styles from './TodoItem.module.css'

type TodoItemProps = {
todo:ITodo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
     className={styles.todoItem}>
      <div className={styles.todoContent}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          style={{ marginRight: "10px" }}
        />
        <span
          className={todo.completed ? styles.completed : ''}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className={styles.deleteButton}
      >
        Delete
      </button>
    </li>
  );
}
export default TodoItem;
