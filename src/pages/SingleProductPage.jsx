import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./SingleProductPage.module.css";
import { Carousel } from "react-responsive-carousel";
import SingleProductDetails from "../components/Product/SingleProductDetails";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProducts } from "../contexts/ProductsContext";
import SpinnerFullPage from "../components/Spinner/SpinnerFullPage";

function SingleProductPage() {
  const { id } = useParams();
  const { productDetails, isLoading, loadProductDetails } = useProducts();

  useEffect(() => {
    const getProductDetails = async () => {
      await loadProductDetails(id);
    };
    getProductDetails();
  }, [loadProductDetails, id]);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-around">
        {JSON.stringify(productDetails) === "{}" || isLoading ? (
          <SpinnerFullPage />
        ) : (
          <>
            <Carousel
              className="carousel-root w-full md:w-1/2"
              showIndicators={false}
              showStatus={false}
            >
              {productDetails.images.map((image, i) => {
                return (
                  <img src={image.url} alt={productDetails.name} key={i} />
                );
              })}
            </Carousel>
            <SingleProductDetails product={productDetails} />
          </>
        )}
      </div>
    </>
  );
}

export default SingleProductPage;
