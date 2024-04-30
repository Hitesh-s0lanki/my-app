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
import { Textarea } from "../ui/textarea";
import { createSubCategorie, getAllCategorie } from "@/lib/categorie.actions";
import { toast } from "sonner";
import { useCreateSubCategorieModal } from "@/hooks/use-create-sub-categorie";
import { useCallback, useEffect, useState } from "react";
import NpmSelect from "../NpmSelect";
import { Categorie } from "@prisma/client";

const formSchema = z.object({
  id: z.string().min(2, {
    message: "Id is require",
  }),
  name: z.string().min(2).max(20),
  description: z.string().min(1, {
    message: "description must be provided...",
  }),
});

const CreateSubCategorieModel = () => {
  const { isOpen, onClose, id, getSubCategories } =
    useCreateSubCategorieModal();

  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { id, name, description } = values;

    const promise = createSubCategorie(id, name, description)
      .then(() => {
        form.reset();
        getSubCategories();
      })
      .finally(() => onClose());

    toast.promise(promise, {
      loading: "Adding a Categorie...",
      success: "Successfully added the sub categorie",
      error: "Something went wrong in creating a categorie",
    });
  };

  const getCategorieName = useCallback(() => {
    setLoading(true);
    const promise = getAllCategorie()
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
      getCategorieName();
    }
  }, [form, id, getCategorieName]);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Sub Category</DialogTitle>
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
                  Categorie name
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
                  <p className="pt-2 text-sm">Select this even once</p>
                </div>
              </div>
            )}

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

export default CreateSubCategorieModel;
