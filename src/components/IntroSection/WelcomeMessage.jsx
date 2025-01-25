import styles from "./WelcomeMessage.module.css";
import WelcomeSlider from "./WelcomeSlider";

function WelcomeMessage() {
  return (
    <div
      className={`${styles.welcomeMessage}  w-full overflow-x-hidden text-white`}
    >
      <WelcomeSlider />
    </div>
  );
}

export default WelcomeMessage;
