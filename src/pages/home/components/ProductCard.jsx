import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
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
    <Card>
      <Link to={`/shop/${props._id}`}>
        <div className="h-80 bg-card rounded-lg p-4 relative">
          <img src={props.image} className="block" />
          {/* Add stock badge */}
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full ${
            props.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {props.stock > 0 ? `${props.stock} in stock` : 'Out of stock'}
          </div>
        </div>
        <div className="flex px-4 mt-4 items-center justify-between">
          <h2 className="text-2xl font-semibold">{props.name}</h2>
          <span className="block text-lg font-medium">${props.price}</span>
        </div>
        <div className="px-4 mt-2">
          <p className="text-sm">{props.description}</p>
        </div>
      </Link>
      <div className="mt-1 p-4">
        <Button 
          className="w-full" 
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
