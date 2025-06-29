import { useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/store/api/baseApi";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCards from "../home/components/ProductCards";
import Tab from "../home/components/Tab";

function ShopPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("none");

  const { data: products, isLoading: isProductsLoading } = useGetProductsQuery();
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  if (isProductsLoading || isCategoriesLoading) {
    return <div>Loading...</div>;
  }

  // Filter products by category
  const filteredProducts = selectedCategoryId === "ALL" 
    ? products 
    : products.filter(product => product.categoryId === selectedCategoryId);

  // Sort products by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <main className="px-8 py-8">
      <h1 className="text-4xl font-bold">Shop</h1>
      <Separator className="mt-2" />
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-4">
          {console.log('Categories from API:', categories)}
          <Tab
            key="ALL"
            _id="ALL"
            selectedCategoryId={selectedCategoryId}
            name="All"
            onTabClick={setSelectedCategoryId}
          />
          {categories
            .filter(category => {
              console.log('Filtering category:', category);
              return category._id !== "ALL" && category.name !== "All";
            })
            .map((category) => (
            <Tab
              key={category._id}
              _id={category._id}
              selectedCategoryId={selectedCategoryId}
              name={category.name}
              onTabClick={setSelectedCategoryId}
            />
          ))}
        </div>

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No sorting</SelectItem>
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ProductCards products={sortedProducts} />
    </main>
  );
}

export default ShopPage;