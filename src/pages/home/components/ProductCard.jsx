import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Link } from "react-router";
import { toast } from "sonner";

function ProductCard(props) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (props.stock <= 0) {
      toast.error("Product is out of stock!");
      return;
    }
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
        stock: props.stock
      })
    );
    toast.success("Item added to cart");
  };

  return (
    <Card className="shadow-xl rounded-2xl overflow-hidden bg-white hover:scale-[1.025] hover:shadow-2xl transition-transform duration-200 border border-gray-100">
      <Link to={`/shop/${props._id}`} className="block group">
        <div className="h-64 bg-gray-50 flex items-center justify-center relative overflow-hidden">
          <img src={props.image} alt={props.name} className="object-contain h-48 w-full transition-transform duration-300 group-hover:scale-105" />
          <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md border ${
            props.stock > 0 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
          }`}>
            {props.stock > 0 ? `${props.stock} in stock` : 'Out of stock'}
          </div>
        </div>
        <div className="flex px-6 mt-4 items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 truncate">{props.name}</h2>
          <span className="block text-lg font-semibold text-primary">${props.price}</span>
        </div>
        <div className="px-6 mt-2 mb-2 min-h-[40px]">
          <p className="text-sm text-gray-600 line-clamp-2">{props.description}</p>
        </div>
      </Link>
      <div className="mt-1 px-6 pb-4">
        <Button 
          className="w-full py-2 rounded-lg font-semibold text-base shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleClick}
          disabled={props.stock <= 0}
        >
          {props.stock > 0 ? 'Add To Cart' : 'Out of Stock'}
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
