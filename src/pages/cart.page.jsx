import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import CartItem from "@/components/CartItem";

function CartPage() {
  const cart = useSelector((state) => state.cart.value);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-4xl font-bold mb-4">My Cart</h2>
        <div className="bg-white shadow-lg rounded-xl p-8 text-center text-gray-500 text-lg">
          Your cart is empty.<br />
          <Link to="/shop" className="text-primary font-semibold hover:underline mt-2 inline-block">Browse products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-10 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">My Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 h-fit border border-gray-100 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between text-lg mb-2">
            <span>Items:</span>
            <span>{itemCount}</span>
          </div>
          <div className="flex justify-between text-lg mb-4">
            <span>Total:</span>
            <span className="font-bold text-primary text-xl">${total.toFixed(2)}</span>
          </div>
          <Button asChild className="w-full py-3 text-lg font-semibold shadow-md hover:scale-105 transition-transform mt-2">
            <Link to="/shop/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
