import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Hero() {
  return (
    <section className="px-4 py-10 md:px-16 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl min-h-[60vh] bg-gradient-to-br from-blue-50 via-white to-yellow-50 shadow-xl overflow-hidden">
        <div className="flex flex-col justify-center gap-4 p-8 md:p-16">
          <span className="inline-block rounded-full px-3 py-1 text-xs font-bold bg-yellow-300 text-yellow-900 shadow-sm tracking-wide animate-pulse w-fit">
            WEEKLY DISCOUNT
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
            Premium Product Online Shop
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Discover the best deals on premium products. Shop with confidence and enjoy exclusive discounts every week!
          </p>
          <Button className="w-fit px-8 py-3 text-lg font-semibold shadow-md hover:scale-105 transition-transform" asChild>
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
        <div className="relative flex items-center justify-center p-6 md:p-12">
          <img
            src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
            alt="Premium Products"
            className="rounded-xl shadow-lg object-cover w-full h-72 md:h-96 lg:h-[28rem] transition-transform duration-500 hover:scale-105 hover:-translate-y-2"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
