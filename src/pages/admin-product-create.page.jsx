import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useSession } from "@clerk/clerk-react";
import { Api } from "../lib/api";
import { useGetCategoriesQuery } from "../lib/api";

function AdminProductCreatePage() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { session } = useSession();
  const [createProduct] = Api.useCreateProductMutation();
  const { data: categories } = useGetCategoriesQuery();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    categoryId: "",
    stock: 100
  });

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        if (!session) return;
        const userMetadata = session.user?.publicMetadata;
        console.log("User metadata:", userMetadata);
        
        if (!userMetadata?.role || userMetadata.role !== 'admin') {
          setError("Unauthorized: Admin access required");
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        setError("Error verifying admin status");
        navigate("/");
      }
    };

    if (isLoaded && isSignedIn) {
      checkAdminRole();
    }
  }, [session, isLoaded, isSignedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const selectedCategory = categories?.find(c => c._id === formData.categoryId);
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        categoryId: formData.categoryId,
        category: selectedCategory?.name || "",
        stock: Number(formData.stock) // Make sure stock is a number
      };

      console.log("Submitting product data:", productData); // Debug log
      const result = await createProduct(productData).unwrap();
      console.log("Product creation success:", result);
      navigate("/shop");
    } catch (error) {
      console.error("Product creation error:", error);
      setError(error.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Price</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full p-2 border rounded"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <select
            value={formData.categoryId}
            onChange={(e) => {
              const category = categories?.find(c => c._id === e.target.value);
              setFormData({
                ...formData, 
                categoryId: e.target.value,
                category: category?.name || ''
              });
            }}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            {categories?.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Stock</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default AdminProductCreatePage;
