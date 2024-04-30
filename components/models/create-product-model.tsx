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
import {
  createSubCategorie,
  getAllCategorie,
  getAllSubCategory,
} from "@/lib/categorie.actions";
import { toast } from "sonner";
import { useCreateSubCategorieModal } from "@/hooks/use-create-sub-categorie";
import { useCallback, useEffect, useState } from "react";
import NpmSelect from "../NpmSelect";
import { Categorie, SubCategorie } from "@prisma/client";
import { useCreateProductModal } from "@/hooks/use-create-product";
import { createProduct } from "@/lib/product.actions";

const formSchema = z.object({
  id: z.string().min(2, {
    message: "Id is require",
  }),
  name: z.string().min(2).max(20),
  price: z.string().min(1, {
    message: "price must be provided...",
  }),
});

const CreateProductModal = () => {
  const { isOpen, onClose, id, getAllProducts } = useCreateProductModal();

  const [categories, setCategories] = useState<SubCategorie[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      price: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { id, name, price } = values;

    const promise = createProduct(id, name, Number.parseFloat(price))
      .then(() => {
        form.reset();
        getAllProducts();
      })
      .finally(() => onClose());

    toast.promise(promise, {
      loading: "Adding a Product...",
      success: "Successfully added the product",
      error: "Something went wrong in creating a product",
    });
  };

  const getSubCategorieName = useCallback(() => {
    setLoading(true);
    const promise = getAllSubCategory()
      .then((response) => setCategories(response))
      .finally(() => setLoading(false));

    toast.promise(promise, {
      loading: "Loading the Data...",
      success: "Fetch Successfull",
      error: "Error in fetching the Data",
    });
  }, []);

  useEffect(() => {
    if (id) {
      form.setValue("id", id);
    } else {
      getSubCategorieName();
    }
  }, [form, id, getSubCategorieName]);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Product</DialogTitle>
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
            {!id && (
              <div className="flex flex-col gap-1">
                <FormLabel className=" text-md whitespace-normal">
                  SubCategory name
                </FormLabel>
                <div className="mx-2">
                  <NpmSelect
                    isLoading={loading}
                    options={categories.map((categorie: Categorie) => ({
                      value: categorie.id,
                      label: categorie.name,
                    }))}
                    onChange={(value) => {
                      form.setValue("id", value.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </div>
                <p className="text-sm pt-2">Select once</p>
              </div>
            )}

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

export default CreateProductModal;
