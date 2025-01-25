import HorizontalLine from "../DashboardNavbar/HorizontalLine";

function OrderCard({ order }) {
  return (
    <div className="w-full my-4">
      <HorizontalLine width="100%" />
      <div>
        <span className="text-black">User ID: </span>
        <span>{order.userId}</span>
      </div>
      <div className="w-min text-black">
        Products:
        <HorizontalLine width="100%" />
      </div>
      {order.order.map((product) => {
        return (
          <div
            className="flex flex-col sm:flex-row items-center justify-between"
            key={product.id}
          >
            <img src={product.images[0].url} alt={product.name} width="50px" />
            <span>{product.name}</span>
            <span>${product.price}</span>
          </div>
        );
      })}
      <div>
        <span className="text-black">Total: </span>
        <span>{order.total}</span>
      </div>
      <HorizontalLine width="100%" />
    </div>
  );
}

export default OrderCard;
