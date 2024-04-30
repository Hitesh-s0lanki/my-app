"use client";

import { DataTable } from "@/components/data-table";
import { useCallback, useEffect, useState } from "react";
import { getAllCategorie } from "@/lib/categorie.actions";
import { toast } from "sonner";
import Loading from "@/components/loading";
import { FullCategorie } from "@/types";

const Home = () => {
  const [categories, setCategories] = useState<FullCategorie[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = useCallback(() => {
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
    getCategories();
  }, [getCategories]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="h-full w-full flex flex-col gap-5 justify-center items-start p-5 md:p-20 lg:p-20">
      <h1 className=" text-lg font-semibold ">Categories</h1>
      <DataTable data={categories} getCategories={getCategories} />
    </main>
  );
};

export default Home;
