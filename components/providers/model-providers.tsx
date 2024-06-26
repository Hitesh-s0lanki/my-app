"use client";
import CreateProductModal from "../models/create-product-model";
import CreateSubCategorieModel from "../models/create-sub-categories";
import EditProductModal from "../models/edit-product-model";
import EditCategoryModal from "../models/edit-categorie";
import CreateCategorieModel from "../models/create-categorie";
import MobileSidebar from "../mobile-sidebar";

const ModalProviders = () => {
  return (
    <>
      <EditProductModal />
      <EditCategoryModal />
      <CreateCategorieModel />
      <CreateSubCategorieModel />
      <CreateProductModal />
      <MobileSidebar />
    </>
  );
};

export default ModalProviders;
