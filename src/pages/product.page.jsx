import { useParams } from "react-router";
import { useGetProductQuery } from "@/store/api/baseApi";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

function ProductPage() {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductQuery(productId);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      })
    );
    toast.success("Item added to cart");
  };

  if (isLoading) {
    return (
      <main className="px-8">
        <div className="grid grid-cols-2 gap-8">
          <Skeleton className="h-[500px]" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="px-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <Button onClick={handleAddToCart} className="w-full md:w-auto">
            Add to Cart
          </Button>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;