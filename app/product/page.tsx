"use client";

import Loading from "@/components/loading";
import { ProductDataTable } from "@/components/product-data-table";
import { getAllProductsServer } from "@/lib/product.actions";
import { FullProduct } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const ProductPage = () => {
  const [products, setProducts] = useState<FullProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = useCallback(() => {
    setLoading(true);
    const promise = getAllProductsServer()
      .then((response) => {
        setProducts(response);
      })
      .finally(() => setLoading(false));

    toast.promise(promise, {
      loading: "Loading the product Data",
      success: "Successfully loaded the product data",
      error: "Error while loading the product data",
    });
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  if (loading) return <Loading />;

  return (
    <div className="h-full w-full flex justify-center p-5 md:p-20 lg:p-20 flex-col gap-5">
      <h1 className=" text-xl font-semibold">Products</h1>
      <ProductDataTable data={products} getAllProducts={getAllProducts} />
    </div>
  );
};

export default ProductPage;
