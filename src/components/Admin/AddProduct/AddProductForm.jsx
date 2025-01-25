import { useState } from "react";
import { useProducts } from "../../../contexts/ProductsContext";
import HorizontalLine from "../DashboardNavbar/HorizontalLine";
import PrimaryButton from "../../Common/PrimaryButton/PrimaryButton";

function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("Tops");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { addNewProduct } = useProducts();
  const message = "Product has been added successfully";

  const handleNameChange = (name) => {
    setProductName(name);
  };

  const handlePriceChange = (price) => {
    setProductPrice(Number(price));
  };

  const handleCategoryChange = (category) => {
    setProductCategory(category);
  };

  const handleDescriptionChange = (description) => {
    setProductDescription(description);
  };

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
  };

  const handleAddImage = () => {
    if (imageUrl !== "") {
      setProductImages((current) => [...current, { url: imageUrl }]);
      setImageUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      price: productPrice,
      description: productDescription,
      images: productImages,
      category: productCategory,
    };
    await addNewProduct(newProduct);
    setShowMessage(true);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductImages([]);
    setProductCategory("Tops");
    setImageUrl("");
  };

  return (
    <form className="w-full flex flex-col p-10 gap-4 max-h-screen overflow-y-auto">
      <span className="text-base sm:text-lg md:text-2xl text-black">
        Add Product
      </span>
      <HorizontalLine width="100%" />
      {showMessage ? <div>{message}</div> : null}
      <div className="flex flex-col md:flex-row item-center justify-between gap-4 flex-wrap">
        <div className="text-xs md:text-sm lg:text-base flex flex-col sm:flex-row items-center gap-2">
          <label htmlFor="name" className="text-black">
            Name
          </label>
          <input
            required
            id="name"
            value={productName}
            onChange={(e) => handleNameChange(e.target.value)}
            type="text"
            className="p-1 sm:text-xs text-sm rounded-md"
          />
        </div>
        <div className="text-xs md:text-sm lg:text-base flex flex-col sm:flex-row items-center gap-2">
          <label htmlFor="price" className="text-black">
            Price
          </label>
          <input
            required
            id="price"
            value={productPrice}
            onChange={(e) => handlePriceChange(e.target.value)}
            type="number"
            min={0}
            className="p-1 sm:text-xs text-sm rounded-md"
          />
        </div>
        <div className="text-xs md:text-sm lg:text-base flex flex-col sm:flex-row items-center gap-2">
          <label htmlFor="category" className="text-black">
            Category
          </label>
          <select
            required
            id="category"
            value={productCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-1 sm:text-xs text-sm rounded-md"
          >
            <option value="Tops">Tops</option>
            <option value="Shoes">Shoes</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
      <div className="text-xs md:text-sm lg:text-base flex flex-col sm:flex-row items-center gap-2">
        <label htmlFor="description" className="text-black">
          Description
        </label>
        <textarea
          required
          value={productDescription}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="w-4/5 resize-none p-1 sm:text-xs text-sm rounded-md"
          rows={3}
          id="description"
        ></textarea>
      </div>
      <div className="text-xs md:text-sm lg:text-base flex flex-col sm:flex-row items-center gap-2">
        <label htmlFor="image" className="text-black">
          Image URL
        </label>
        <input
          required={productImages.length < 1}
          id="image"
          value={imageUrl}
          onChange={(e) => handleImageUrlChange(e.target.value)}
          type="text"
          className="p-1 sm:text-xs text-sm rounded-md"
        />
        <button type="button" className="text-black" onClick={handleAddImage}>
          Add Image
        </button>
      </div>
      {productImages.map((image, i) => {
        return (
          <div className="text-xs md:text-sm lg:text-base" key={i}>
            {image.url}
          </div>
        );
      })}
      <PrimaryButton onClick={handleSubmit}>Add Product</PrimaryButton>
    </form>
  );
}

export default AddProductForm;
