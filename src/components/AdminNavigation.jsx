import { Link } from "react-router-dom";

function AdminNavigation() {
  return (
    <nav className="bg-white border-b">
      <div className="px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/admin" className="text-xl font-semibold">
              Admin Dashboard
            </Link>
          </div>
          <div className="flex gap-4">
            <Link 
              to="/admin/products/create" 
              className="text-sm font-medium hover:text-primary"
            >
              Create Product
            </Link>
            <Link 
              to="/admin/products" 
              className="text-sm font-medium hover:text-primary"
            >
              Manage Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavigation;