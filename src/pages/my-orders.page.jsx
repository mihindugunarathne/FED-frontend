// filepath: /C:/Users/DELL/Desktop/MY PLANS/STEM LINK/FED-FRONTEND - DEV/src/pages/my-orders.page.jsx
import { useGetUserOrdersQuery } from "@/store/api/baseApi";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

function MyOrdersPage() {
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();

  if (error) {
    console.error('Error fetching orders:', error);
    return <main className="px-4 py-8"><div className="text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg p-4">Error loading orders: {error.message}</div></main>;
  }

  if (isLoading) {
    return (
      <main className="px-4 py-8">
        <h2 className="text-4xl font-bold mb-6">My Orders</h2>
        <div className="space-y-4">
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
      </main>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <main className="px-4 py-8">
        <h2 className="text-4xl font-bold mb-6">My Orders</h2>
        <div className="bg-white shadow rounded-xl p-8 text-center text-gray-500 text-lg">You have no orders yet.</div>
      </main>
    );
  }

  return (
    <main className="px-4 py-8">
      <h2 className="text-4xl font-bold mb-6">My Orders</h2>
      <div className="space-y-8">
        {orders?.map((order) => (
          <div key={order._id} className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-lg text-gray-900">Order <span className="text-primary">#{order._id.slice(-6)}</span></p>
                {order.createdAt && (
                  <p className="text-sm text-gray-500">Placed on {format(new Date(order.createdAt), 'PPP')}</p>
                )}
              </div>
              <div className="flex gap-2 flex-wrap mt-2 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>{order.orderStatus}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>{order.paymentStatus}</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {order.items?.map((item, index) => (
                <div key={index} className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={item.product?.image || 'fallback-image.jpg'}
                    alt={item.product?.name || 'No Name Available'}
                    className="w-full h-28 object-contain rounded mb-2 bg-white"
                  />
                  <p className="font-medium text-center text-gray-900 truncate w-full">{item.product?.name || 'No Name Available'}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-xs text-gray-500">Price: ${item.product?.price}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-900 mb-1">Shipping Address:</p>
                <div className="text-sm text-gray-700 leading-tight">
                  <p>{order.addressId?.line_1}</p>
                  {order.addressId?.line_2 && <p>{order.addressId?.line_2}</p>}
                  <p>{order.addressId?.city}, {order.addressId?.state} {order.addressId?.zip_code}</p>
                  <p>{order.addressId?.phone}</p>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end">
                <p className="font-semibold text-lg text-primary">Total: ${order.totalPrice?.toFixed(2) ?? 'N/A'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MyOrdersPage;