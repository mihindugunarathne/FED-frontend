import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Navigate, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "@/store/api/baseApi";
import { toast } from "sonner";
import { clearCart } from "@/lib/features/cartSlice";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  line_1: z.string().min(1),
  line_2: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip_code: z.string().min(1),
  phone: z.string().refine(
    (value) => {
      // This regex checks for a basic international phone number format
      return /^\+?[1-9]\d{1,14}$/.test(value);
    },
    {
      message: "Invalid phone number format",
    }
  ),
});

const ShippingAddressForm = ({ cart }) => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      line_1: '',
      line_2: '',
      city: '',
      state: '',
      zip_code: '',
      phone: ''
    }
  });
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();
  console.log(cart);

  async function handleSubmit(values) {
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item.product._id,  // Make sure this is a string
          quantity: item.quantity
        })),
        shippingAddress: {
          line_1: values.line_1,
          line_2: values.line_2,
          city: values.city,
          state: values.state,
          zip_code: values.zip_code,
          phone: values.phone
        }
      };

      // Debug log
      console.log('Order data being sent:', JSON.stringify(orderData, null, 2));

      const result = await createOrder(orderData).unwrap();

      if (result) {
        dispatch(clearCart());
        toast.success("Order placed successfully");
        navigate("/shop/payment", { 
          state: { orderId: result._id }
        });
      }
    } catch (error) {
      console.error('Order creation error details:', {
        status: error.status,
        data: error.data,
        originalError: error
      });
      toast.error(error.data?.message || "Failed to place order");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <FormField
              control={form.control}
              name="line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="16/1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Kadawatha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Wester Province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="11850" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+94702700100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
