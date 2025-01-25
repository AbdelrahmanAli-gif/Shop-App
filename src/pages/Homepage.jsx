import CategoriesList from "../components/Categories/CategoriesList";
import IntroSection from "../components/IntroSection/IntroSection";
import ProductList from "../components/Product/ProductList";
import PrimaryButton from "../components/Common/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate("products");
  };
  return (
    <>
      <IntroSection />
      <CategoriesList />
      <ProductList />
      <PrimaryButton onClick={navigateToProducts} className="px-8 mb-14">
        See More
      </PrimaryButton>
    </>
  );
}

export default Homepage;
