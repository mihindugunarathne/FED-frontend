import ProductCard from "./ProductCard";

function ProductCards(props) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {props.products.map((product) => {
        console.log("Product with stock:", product); // Debug log
        return (
          <ProductCard
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
            stock={Number(product.stock)} // Convert to number explicitly
            category={product.category}
            categoryId={product.categoryId}
          />
        );
      })}
    </div>
  );
}

export default ProductCards;
