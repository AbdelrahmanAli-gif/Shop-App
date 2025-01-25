import { useEffect } from "react";
import { useState } from "react";
import styles from "./WelcomeSlider.module.css";
import SlideMessage from "./SlideMessage";

function WelcomeSlider() {
  const [numSlides, setNumSlides] = useState(0);
  const array = Array.apply(null, Array(numSlides * 2)).map(function (_, i) {
    return { id: i };
  });

  const getCurrentWidth = () => {
    const width = window.innerWidth;
    if (width >= 768) setNumSlides(3);
    else if (width >= 640) setNumSlides(2);
    else setNumSlides(1);
  };

  useEffect(() => {
    window.addEventListener("resize", getCurrentWidth);
    getCurrentWidth();
    return () => window.removeEventListener("resize", getCurrentWidth);
  }, []);

  return (
    <div
      className={`${styles.welcomeSlider} h-12 flex items-center whitespace-nowrap`}
    >
      {array.map((item) => {
        return <SlideMessage key={item.id} width={1 / numSlides} />;
      })}
    </div>
  );
}

export default WelcomeSlider;
