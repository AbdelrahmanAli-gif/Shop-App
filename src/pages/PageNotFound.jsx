import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../components/Common/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <FontAwesomeIcon
        icon={faFaceFrown}
        className="icon w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64"
      />
      <span className="text-sm sm:text-base md:text-2xl">Page Not Found</span>
      <PrimaryButton onClick={handleNavigation}>Back to Homepage</PrimaryButton>
    </div>
  );
}

export default PageNotFound;
