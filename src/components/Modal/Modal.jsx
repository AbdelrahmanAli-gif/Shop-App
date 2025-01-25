import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/ProductsContext";

function Modal() {
  const [timer, setTimer] = useState(5);
  const { clearCart } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      if (timer === 0) {
        clearCart();
        navigate("/");
      }
      if (timer > 0) setTimer((current) => current - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timer, navigate, clearCart]);

  return (
    <ReactModal
      isOpen={true}
      ariaHideApp={false}
      style={{
        overlay: {
          zIndex: "50",
        },
        content: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        },
      }}
    >
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="w-20 sm:w-48 md:w-60 h-20 sm:h-48 md:h-60"
      />
      <p className="text-sm sm:text-base md:text-xl text-center">
        Your order has been placed successfully
      </p>
      <p className="text-xs sm:text-sm md:text-base text-center">
        Redirecting in {timer}
      </p>
    </ReactModal>
  );
}

export default Modal;
