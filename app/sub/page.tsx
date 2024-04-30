"use client";

import Loading from "@/components/loading";
import { SubDataTable } from "@/components/sub-data-table";
import { getAllSubCategory } from "@/lib/categorie.actions";
import { FullSubCategorie } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const SubCategory = () => {
  const [subCategorie, setSubCatogerie] = useState<FullSubCategorie[]>([]);
  const [loading, setLoading] = useState(false);

  const getSubCategories = useCallback(async () => {
    setLoading(true);
    const promise = getAllSubCategory()
      .then((response) => {
        setSubCatogerie(response);
      })
      .finally(() => setLoading(false));

    toast.promise(promise, {
      loading: "Loading the Subcategories",
      success: "Loading Successfull",
      error: "Something went wrong in fetching the sub categories",
    });
  }, []);

  useEffect(() => {
    getSubCategories();
  }, [getSubCategories]);

  if (loading) return <Loading />;

  return (
    <div className=" h-full w-full p-5 lg:p-20 md:p-20 flex justify-center flex-col gap-5">
      <h1 className=" text-xl font-semibold">SubCategories</h1>
      <SubDataTable data={subCategorie} getSubCategories={getSubCategories} />
    </div>
  );
};

export default SubCategory;
