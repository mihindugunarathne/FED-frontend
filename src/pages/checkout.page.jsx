import ShippingAddressForm from "@/components/ShippingAddressForm";
import { useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import { Navigate } from "react-router";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <main className="px-8">
      <h2 className="text-4xl font-bold">Checkout Page</h2>
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Order Details</h3>
        <div className="mt-2 grid grid-cols-4 gap-x-4">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Enter Shipping Address</h3>
        <div className="mt-2 w-1/2">
          <ShippingAddressForm cart={cart} />
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;