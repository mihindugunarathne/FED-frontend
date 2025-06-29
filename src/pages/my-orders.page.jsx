// filepath: /C:/Users/DELL/Desktop/MY PLANS/STEM LINK/FED-FRONTEND - DEV/src/pages/my-orders.page.jsx
import { useGetUserOrdersQuery } from "@/store/api/baseApi";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

function MyOrdersPage() {
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();

  // Add error handling
  if (error) {
    console.error('Error fetching orders:', error);
    return <div>Error loading orders: {error.message}</div>;
  }

  if (isLoading) {
    return (
      <main className="px-8">
        <h2 className="text-4xl font-bold">My Orders</h2>
        <div className="mt-4 space-y-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </main>
    );
  }

  return (
    <main className="px-8">
      <h2 className="text-4xl font-bold">My Orders</h2>
      <div className="mt-4 space-y-4">
        {orders?.map((order) => (
          <div key={order._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Order #{order._id}</p>
              <div className="space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {order.orderStatus}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                  {order.paymentStatus}
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {order.items?.map((item, index) => (
                <div key={index} className="border rounded p-2">
                  <img
                    src={item.product?.image || "fallback-image.jpg"}
                    alt={item.product?.name || "No Name Available"}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="mt-2 font-medium">{item.product?.name || "No Name Available"}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ${item.product?.price}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="font-medium">Shipping Address:</p>
              <p>{order.addressId?.line_1}</p>
              <p>{order.addressId?.line_2}</p>
              <p>
                {order.addressId?.city}, {order.addressId?.state}{" "}
                {order.addressId?.zip_code}
              </p>
              <p>{order.addressId?.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MyOrdersPage;