import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation, useGetCategoriesQuery } from "@/store/api/baseApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().min(1, "Image URL is required"),
  stripePriceId: z.string()
    .min(1, "Stripe Price ID is required")
    .regex(/^price_/, "Must start with 'price_'")
});

function AdminProductCreatePage() {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      image: "",
      stripePriceId: ""
    }
  });

  // Add useEffect for token verification
  useEffect(() => {
    async function verifyToken() {
      try {
        const session = await window.Clerk?.session;
        // Updated template name
        const token = await session?.getToken({ template: 'store_admin' });
        
        console.log('Token Verification:', {
          hasSession: !!session,
          hasToken: !!token,
          tokenPreview: token ? `${token.substring(0, 50)}...` : 'No token',
          sessionId: session?.id,
          role: session?.user?.publicMetadata?.role
        });
      } catch (error) {
        console.error('Token verification failed:', error);
        toast.error('Failed to verify admin access');
      }
    }

    verifyToken();
  }, []);

  async function onSubmit(values) {
    try {
      const session = await window.Clerk?.session;
      const token = await session?.getToken({ template: 'store_admin' });
      
      console.log('Admin check:', {
        sessionId: session?.id,
        role: session?.user?.publicMetadata?.role,
        hasToken: !!token
      });

      if (!token) {
        throw new Error('No admin authorization token available');
      }

      const productData = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        stock: Number(values.stock),
        categoryId: values.categoryId,
        image: values.image.trim(),
        stripePriceId: values.stripePriceId.trim() // Add this line
      };

      const result = await createProduct(productData).unwrap();
      toast.success("Product created successfully");
      form.reset();
    } catch (error) {
      console.error('Product creation failed:', error);
      toast.error(error.data?.message || "Failed to create product");
    }
  }

  // Show loading state while categories load
  if (categoriesLoading) {
    return (
      <main className="px-8">
        <h1 className="text-4xl font-bold">Create Product</h1>
        <div className="mt-8">Loading categories...</div>
      </main>
    );
  }

  return (
    <main className="px-8">
      <h1 className="text-4xl font-bold">Create Product</h1>
      <div className="mt-8 max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map(category => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stripePriceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stripe Price ID</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="price_..." 
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value.startsWith('price_') && value.length > 0) {
                          field.onChange('price_' + value);
                        } else {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isLoading || !categories?.length}
              className="w-full"
            >
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default AdminProductCreatePage;
