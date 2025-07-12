import { Card } from "@/components/ui/card";

function CartItem({ item }) {
  return (
    <Card className="p-4 shadow-lg rounded-xl transition-transform hover:scale-[1.015] hover:shadow-2xl flex items-center gap-4 bg-white border border-gray-100">
      <img
        src={item.product.image || "/placeholder.svg"}
        alt={item.product.name}
        className="w-20 h-20 object-contain rounded-lg bg-gray-50 border border-gray-200"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-lg text-gray-900 truncate">{item.product.name}</p>
        <p className="text-primary font-bold text-base mt-1">${item.product.price}</p>
        <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
      </div>
    </Card>
  );
}

export default CartItem;
