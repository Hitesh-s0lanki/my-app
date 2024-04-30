import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateCategorieModal } from "@/hooks/use-create-categorie";
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
import { Textarea } from "../ui/textarea";
import {
  createCategorie,
  getAllSubCategoriesById,
  getCategorieById,
  updateCategory,
} from "@/lib/categorie.actions";
import { toast } from "sonner";
import { useEditCategoryModal } from "@/hooks/use-edit-category";
import { useCallback, useEffect, useState } from "react";
import { Categorie } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(1, {
    message: "description must be provided...",
  }),
});

const EditCategoryModal = () => {
  const { isOpen, onClose, id, getCategories } = useEditCategoryModal();

  const [category, setCategory] = useState<Categorie | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const getCategory = useCallback(() => {
    console.log("I m here");
    if (id) {
      const promise = getCategorieById(id).then((response) => {
        setCategory(response);

        if (response && response.name && response.description) {
          form.setValue("name", response.name);
          form.setValue("description", response.description);
        }
      });

      toast.promise(promise, {
        loading: "Adding a Categorie...",
        success: "Successfully added the categorie",
        error: "Something went wrong in creating a categorie",
      });
    }
  }, [form, id]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, description } = values;

    const data: any = {};

    if (!id) return toast.error("No id found");

    if (name !== category?.name) {
      data.name = name;
    }
    if (description !== category?.description) {
      data.description = description;
    }

    if (data) {
      const promise = updateCategory({ id: category?.id, ...data })
        .then(() => {
          getCategories();
          form.reset();
        })
        .finally(() => onClose());

      toast.promise(promise, {
        loading: "Adding a Categorie...",
        success: "Successfully updated the categorie",
        error: "Something went wrong in creating a categorie",
      });
    } else {
      toast.warning("No Update in data");
      onClose();
    }
  };

  useEffect(() => {
    getCategory();
  }, [getCategory, form]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Categorie</DialogTitle>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the categorie description"
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

export default EditCategoryModal;
