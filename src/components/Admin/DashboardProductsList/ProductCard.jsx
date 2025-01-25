import { Carousel } from "react-responsive-carousel";
import HorizontalLine from "../DashboardNavbar/HorizontalLine";

function ProductCard({ product }) {
  return (
    <div className="w-full my-6 relative">
      <HorizontalLine width="100%" />
      <div className="flex flex-col sm:flex-row items-center">
        <Carousel
          className="carousel-root w-36 sm:w-64"
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
        >
          {product.images.map((image, i) => {
            return <img src={image.url} alt={`image${i}`} key={i} />;
          })}
          <img src={product.images[0].url} />
        </Carousel>
        <div className="flex flex-col justify-between text-xs sm:text-sm md:text-base">
          <span className="text-black">{product.name}</span>
          <span>{product.description}</span>
          <span className="text-black">${product.price}</span>
        </div>
      </div>
      <HorizontalLine width="100%" />
    </div>
  );
}

export default ProductCard;
