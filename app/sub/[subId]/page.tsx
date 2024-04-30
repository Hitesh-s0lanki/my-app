"use client";

import Loading from "@/components/loading";
import { SubDataTable } from "@/components/sub-data-table";
import { getAllSubCategoriesById } from "@/lib/categorie.actions";
import { FullSubCategorie } from "@/types";
import { Categorie } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const SubPage = ({
  params,
}: {
  params: {
    subId: string;
  };
}) => {
  const [categorie, setCatogerie] = useState<Categorie | null>(null);
  const [subCategorie, setSubCatogerie] = useState<FullSubCategorie[]>([]);
  const [loading, setLoading] = useState(false);

  const getSubCategories = useCallback(async () => {
    setLoading(true);
    const promise = getAllSubCategoriesById(params.subId)
      .then((response) => {
        setCatogerie(response.categorie);
        setSubCatogerie(response.subcategories);
      })
      .finally(() => setLoading(false));

    toast.promise(promise, {
      loading: "Loading the Subcategories",
      success: "Loading Successfull",
      error: "Something went wrong in fetching the sub categories",
    });
  }, [params.subId]);

  useEffect(() => {
    getSubCategories();
  }, [getSubCategories]);

  if (loading) return <Loading />;

  return (
    <div className=" h-full w-full p-5 lg:p-20 md:p-20 flex justify-center flex-col gap-5">
      <h1 className=" text-xl font-semibold">
        Sub Categories of {categorie?.name}
      </h1>
      <SubDataTable
        data={subCategorie}
        categorie={categorie!}
        getSubCategories={getSubCategories}
      />
    </div>
  );
};

export default SubPage;
