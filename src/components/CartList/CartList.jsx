import PrimaryButton from "../Common/PrimaryButton/PrimaryButton";
import { useUser } from "../../contexts/UserContext";
import CartItem from "./CartItem";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useProducts } from "../../contexts/ProductsContext";

function CartList() {
  const [ordered, setOrdered] = useState(false);
  const { cart } = useUser();
  const { addOrder } = useProducts();
  const cartCount = Object.keys(cart).length;
  const cartTotal = Object.values(cart).reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );

  const handleOrdered = async () => {
    setOrdered((current) => !current);
    await addOrder(cart);
  };

  return (
    <div className="h-screen p-2 sm:p-6 md:p-12">
      {cartCount === 0 ? (
        <h1>Your cart is empty, start shopping now</h1>
      ) : (
        <>
          <div className="flex flex-col h-4/5 w-full md:w-2/3 lg:w-1/2 overflow-y-auto py-4 px-0 sm:px-4 md:px-8 gap-2 bg-white">
            {Object.values(cart).map((item) => {
              return <CartItem item={item} key={item.id} />;
            })}
          </div>
          <div className="w-full md:w-2/3 lg:w-1/2 mt-8 flex justify-between text-black text-base md:text-2xl items-center">
            <p>Total: {cartTotal.toFixed(2)}</p>
            <PrimaryButton onClick={handleOrdered}>Place order</PrimaryButton>
          </div>
          {ordered ? <Modal /> : null}
        </>
      )}
    </div>
  );
}

export default CartList;
