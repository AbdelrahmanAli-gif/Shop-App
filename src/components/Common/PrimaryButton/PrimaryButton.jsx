import styles from "./PrimaryButton.module.css";

function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <div className={`${className} flex justify-end`}>
      <button
        onClick={onClick}
        className={`${styles.primaryBtn} text-base sm:text-lg md:text-xl px-1 py-1 sm:px-2 sm:py-2 md:px-4 md:py-3 rounded-xl text-black`}
      >
        {children}
      </button>
    </div>
  );
}

export default PrimaryButton;
