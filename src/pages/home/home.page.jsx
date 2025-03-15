import Hero from "./components/Hero";
import Products from "./components/Products";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <main>
      <Hero />
      <Products />
      {isAdmin && (
        <button
          onClick={() => navigate("/admin/products/create")}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Create New Product
        </button>
      )}
    </main>
  );
}

export default HomePage;
