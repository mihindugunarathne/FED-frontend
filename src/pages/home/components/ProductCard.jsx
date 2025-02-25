import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Link } from "react-router";
import { toast } from "sonner";

function ProductCard(props) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
      })
    );
    toast.success("Item added to cart");
  };

  return (
    <Card>
      <Link to={`/shop/${props._id}`}>
        <div className="h-80 bg-card rounded-lg p-4 relative">
          <img src={props.image} className="block" />
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
        <Button className="w-full" onClick={handleClick}>
          Add To Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
