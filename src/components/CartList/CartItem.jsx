import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProducts } from "../../contexts/ProductsContext";

function CartItem({ item }) {
  const { removeFromCart } = useProducts();

  const handleRemove = async () => {
    await removeFromCart(item.id);
  };

  return (
    <div key={item.id} className="border-2 border-black flex justify-between">
      <div className="flex">
        <img
          src={item.images[0].url}
          alt={item.name}
          className="w-20 sm:28 md:w-32 lg:w-40"
        />
        <div className="flex flex-col justify-around text-black text-xs sm:text-s md:text-base">
          <p>{item.name}</p>
          <p>{item.price}</p>
        </div>
      </div>
      <button className="h-fit py-3 mr-6" onClick={handleRemove}>
        <FontAwesomeIcon icon={faXmark} className="icon" />
      </button>
    </div>
  );
}

export default CartItem;
