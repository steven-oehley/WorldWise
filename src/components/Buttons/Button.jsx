import styles from "./Button.module.css";

function Button({ type = "button", children, onClick, bType }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[bType]}`}
    >
      {children}
    </button>
  );
}

export default Button;
