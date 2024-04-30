"use server";

import { FullSubCategorie } from "@/types";
import { db } from "./db";
import { Product, SubCategorie } from '@prisma/client';

export const createCategorie = async (name: string, description: string) => {
    try {
        const categorie = await db.categorie.create({
            data: {
                name,
                description
            }
        })

        return categorie
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getCategorieById = async (id: string) => {
    try {
        const category = db.categorie.findUnique({
            where: {
                id
            },
            include: {
                SubCategorie: true
            }
        })

        if (!category) throw new Error("Category not found")

        return category
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllCategorie = async () => {
    try {
        const categories = await db.categorie.findMany({
            include: {
                SubCategorie: true
            }
        })

        console.log(categories)

        return categories
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllSubCategoriesById = async (id: string) => {
    try {

        // check categories exist or not
        const categorie = await getCategorieById(id)
        if (!categorie) throw new Error("No Categorie Found")

        const subcategories = await db.subCategorie.findMany({
            where: {
                CategorieId: categorie.id
            },
            include: {
                Products: true,
                Categorie: true
            }
        })

        const new_subcategories: FullSubCategorie[] = subcategories.map((subcategorie: any) => {
            return {
                ...subcategorie,
                Products: subcategorie.Products.map((product: Product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price.toNumber()
                }))
            }
        })

        return { categorie, subcategories: new_subcategories }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllSubCategory = async () => {
    try {
        const subCategorie = await db.subCategorie.findMany({
            include: {
                Categorie: true,
                Products: true
            }
        })

        const new_subCategory: FullSubCategorie[] = subCategorie.map((subcategorie) => {
            return {
                ...subcategorie,
                Products: subcategorie.Products.map((product: Product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price.toNumber()
                }))
            }
        })

        return new_subCategory

    } catch (error) {
        console.log(error)
        throw error
    }
}


export const createSubCategorie = async (categorie_id: string, name: string, description: string) => {
    try {
        const subCategorie = await db.subCategorie.create({
            data: {
                name,
                description,
                Categorie: {
                    connect: {
                        id: categorie_id
                    }
                }
            },
        })

        return subCategorie
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteCategorie = async (id: string) => {
    try {
        await db.categorie.delete({
            where: {
                id
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteSubCategorie = async (id: string) => {
    try {
        await db.subCategorie.delete({
            where: {
                id
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const updateCategory = async ({ id, name, description }: { id: string, name?: string, description?: string }) => {
    try {


        const Category = await db.categorie.findUnique({
            where: {
                id
            }
        })

        if (!Category) throw new Error("Categroy not found")

        await db.categorie.update({
            where: {
                id: Category.id
            },
            data: {
                name,
                description
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateSubCategory = async (id: string, name?: string, description?: string) => {
    try {
        await db.subCategorie.update({
            where: {
                id
            },
            data: {
                name,
                description
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}