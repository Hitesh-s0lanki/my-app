"use client";

import CreateCategorieModel from "../models/edit-categorie";
import CreateProductModal from "../models/create-product-model";
import CreateSubCategorieModel from "../models/create-sub-categories";
import EditProductModal from "../models/edit-product-model";
import EditCategoryModal from "../models/edit-categorie";

const ModalProviders = () => {
  return (
    <>
      <EditProductModal />
      <EditCategoryModal />
      <CreateCategorieModel />
      <CreateSubCategorieModel />
      <CreateProductModal />
    </>
  );
};

export default ModalProviders;
