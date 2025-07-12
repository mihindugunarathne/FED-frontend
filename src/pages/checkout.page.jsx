import ShippingAddressForm from "@/components/ShippingAddressForm";
import { useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import { Navigate } from "react-router";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <main className="px-4 py-10 max-w-2xl mx-auto flex flex-col gap-8">
      {/* Shipping Address - now at the top, full width, visually larger */}
      <section className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold mb-6">Shipping Address</h2>
        <div className="max-w-xl mx-auto">
          <ShippingAddressForm cart={cart} inputSize="lg" />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Order Summary */}
      <section className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <h3 className="text-2xl font-semibold mb-2">Order Summary</h3>
        <div className="flex justify-between text-lg mb-1">
          <span>Items:</span>
          <span>{itemCount}</span>
        </div>
        <div className="flex justify-between text-lg mb-2">
          <span>Total:</span>
          <span className="font-bold text-primary text-xl">${total.toFixed(2)}</span>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Order Details */}
      <section className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <h3 className="text-2xl font-semibold mb-4">Order Details</h3>
        <div className="flex flex-col gap-4">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CheckoutPage;