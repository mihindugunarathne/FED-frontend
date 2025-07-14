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
  image: z.string().min(1, "Image URL is required")
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
      image: ""
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
        image: values.image.trim()
      };

      const result = await createProduct(productData).unwrap();
      console.log("########################5", result);
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <div className="text-lg font-semibold text-gray-600">Loading categories...</div>
      </main>
    );
  }

  // Live image preview
  const imageUrl = form.watch("image");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-yellow-50 px-2 py-8">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-primary">Create Product</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Name</FormLabel>
                    <FormControl>
                      <Input className="h-12 text-lg" placeholder="Product name" {...field} />
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
                    <FormLabel className="text-base font-semibold">Description</FormLabel>
                    <FormControl>
                      <Input className="h-12 text-lg" placeholder="Product description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          className="h-12 text-lg" 
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
                      <FormLabel className="text-base font-semibold">Stock</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          className="h-12 text-lg" 
                          placeholder="0" 
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map(category => (
                          <SelectItem key={category._id} value={category._id} className="text-lg">
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
                    <FormLabel className="text-base font-semibold">Image URL</FormLabel>
                    <FormControl>
                      <Input className="h-12 text-lg" placeholder="Image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Live image preview */}
              {imageUrl && imageUrl.length > 5 && (
                <div className="flex justify-center my-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-40 h-40 object-contain rounded-lg border border-gray-200 shadow"
                    onError={e => (e.target.style.display = 'none')}
                  />
                </div>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !categories?.length}
              className="w-full h-14 text-lg font-bold mt-4 shadow-md hover:scale-105 transition-transform"
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
