import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Link } from "react-router-dom"; // Fix the import
import { toast } from "sonner";

function ProductCard(props) {
  const dispatch = useDispatch();
  const stock = parseInt(props.stock) || 0; // Better number conversion with fallback

  console.log("Product stock:", stock); // Debug log

  const handleClick = (e) => {
    e.preventDefault(); // Prevent event bubbling

    if (stock <= 0) {
      toast.error("Product is out of stock!");
      return;
    }
    
    try {
      dispatch(
        addToCart({
          _id: props._id,
          name: props.name,
          price: props.price,
          image: props.image,
          description: props.description,
          stock: stock,
          quantity: 1
        })
      );
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <Link to={`/shop/${props._id}`} className="flex-grow">
        <div className="h-80 bg-card rounded-lg p-4 relative">
          <img 
            src={props.image} 
            alt={props.name} 
            className="w-full h-full object-contain"
          />
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-sm font-medium ${
            stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </div>
        </div>
        <div className="flex px-4 mt-4 items-center justify-between">
          <h2 className="text-xl font-semibold truncate">{props.name}</h2>
          <span className="block text-lg font-medium">${props.price.toFixed(2)}</span>
        </div>
      </Link>
      <div className="mt-4 p-4">
        <Button 
          className="w-full" 
          onClick={handleClick}
          disabled={stock <= 0}
          variant={stock <= 0 ? "secondary" : "default"}
        >
          {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
