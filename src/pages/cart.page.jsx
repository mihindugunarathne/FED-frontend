import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import CartItem from "@/components/CartItem";

function CartPage() {
  const cart = useSelector((state) => state.cart.value);

  return (
    <main className="px-8">
      <h2 className="text-4xl font-bold">My Cart</h2>
      <div className="mt-4 grid grid-cols-2 w-1/2 gap-x-4">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>

      <div className="mt-4">
        {cart.length > 0 ? (
          <Button asChild>
            <Link to="/shop/checkout">Proceed to Checkout</Link>
          </Button>
        ) : (
          <p>No items in cart</p>
        )}
      </div>
    </main>
  );
}

export default CartPage;
