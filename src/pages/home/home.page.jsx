import Hero from "./components/Hero";
import Products from "./components/Products";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HomePage() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <div>
      <main>
        <Hero />
        <Products />
      </main>
      
      {isAdmin && (
        <div className="fixed bottom-8 right-8">
          <Link to="/admin/products/create">
            <Button className="bg-primary text-white hover:bg-primary/90">
              + Create Product
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
