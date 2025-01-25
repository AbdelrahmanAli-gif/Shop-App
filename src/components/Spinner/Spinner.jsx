import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className={`${styles.spinner} w-24 h-24 rounded-full`}></div>
    </div>
  );
}

export default Spinner;
