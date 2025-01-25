import Spinner from "./Spinner";
import styles from "./SpinnerFullPage.module.css";

function SpinnerFullPage() {
  return (
    <div className={`${styles.spinnerFullpage} m-10`}>
      <Spinner />
    </div>
  );
}

export default SpinnerFullPage;
