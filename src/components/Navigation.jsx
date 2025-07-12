import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

function Navigation(props) {
  const cart = useSelector((state) => state.cart.value);

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-lg rounded-b-xl mx-auto mt-0 px-8 py-4 flex items-center justify-between transition-all duration-300">
      <div className="flex gap-x-16 items-center">
        <Link className="font-bold text-3xl tracking-tight text-gray-900 hover:text-primary transition-colors" to="/">
          Mebius
        </Link>
        <div className="flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <Link to="/shop" className="hover:text-primary transition-colors font-medium">Shop</Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div>
          <Link to="/shop/cart" className="relative flex items-center gap-2 group">
            <span className="absolute -top-2 -right-3 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md group-hover:scale-110 transition-transform">{getCartQuantity()}</span>
            <ShoppingCart className="w-6 h-6 group-hover:text-primary transition-colors" />
            <span className="ml-1 font-medium group-hover:text-primary transition-colors">Cart</span>
          </Link>
        </div>
        <SignedOut>
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className="text-primary font-semibold hover:underline">Sign In</Link>
            <Link to="/sign-up" className="text-primary font-semibold hover:underline">Sign Up</Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <Link to="/my-orders" className="hover:text-primary transition-colors font-medium">My Orders</Link>
            <Link to="/account" className="hover:text-primary transition-colors font-medium">Account</Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
