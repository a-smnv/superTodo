import styles from "../button/Button.module.css";

type FilterType = "all" | "active" | "completed";
interface ButtonComponentProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  currentFilter: string;
  children: React.ReactNode;
}
export const ButtonComponent = ({
  filter,
  onFilterChange,
  currentFilter,
  children,
}: ButtonComponentProps) => {
  return (
    <button
      className={`${styles.button} ${
        currentFilter === filter ? styles.buttonPrimary : styles.buttonSecondary
      }`}
      onClick={() => onFilterChange(filter)}
    >
      {children}
    </button>
  );
};
