import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import NpmSelect from "../NpmSelect";
import { Categorie } from "@prisma/client";
import { useCreateProductModal } from "@/hooks/use-create-product";
import { getProductById, updateProduct } from "@/lib/product.actions";
import { FullProduct } from "@/types";
import { toast } from "sonner";
import { useEditProductModal } from "@/hooks/use-edit-product";

const formSchema = z.object({
  name: z.string().min(2).max(20),
  price: z.string().min(1, {
    message: "price must be provided...",
  }),
});

const EditProductModal = () => {
  const { isOpen, onClose, id, getAllProducts } = useEditProductModal();

  const [product, setProduct] = useState<FullProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  const getProduct = useCallback(() => {
    setLoading(true);
    if (id) {
      const promise = getProductById(id)
        .then((response) => {
          setProduct(response);
          form.setValue("name", response.name);
          form.setValue("price", `${response.price}`);
        })
        .finally(() => setLoading(false));

      toast.promise(promise, {
        loading: "Loading the data...",
        success: "Successfully loaded",
        error: "Something went wrong in loading data",
      });
    }
  }, [id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, price } = values;

    const data: any = {};

    if (name !== product?.name) {
      data.name = name;
    }
    if (price !== `${product?.price}`) {
      data.price = Number.parseFloat(price);
    }

    if (data) {
      await updateProduct({ id: product!.id, ...data });

      getAllProducts();
    }

    onClose();
  };

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of categorie"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                      step="0.01"
                      placeholder="Enter the Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" w-full ">
              <Button type="submit" className=" w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
