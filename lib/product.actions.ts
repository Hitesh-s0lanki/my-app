"use server";

import { FullProduct } from "@/types";
import { db } from "./db";

export const createProduct = async (subcategory_id: string, name: string, price: number) => {
    try {
        const product = await db.product.create({
            data: {
                name,
                price,
                Subcategory: {
                    connect: {
                        id: subcategory_id
                    }
                }
            }
        })


        return product
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllProductBySubCategorie = async (subcategory_id: string) => {
    try {
        //Check for the subCategorie    
        const subCategorie = await db.subCategorie.findUnique({
            where: {
                id: subcategory_id
            }
        })

        if (!subCategorie) {
            throw new Error("Subcategories not found")
        }

        const products = await db.product.findMany({
            where: {
                subcategory_id
            },
            include: {
                Subcategory: true
            }
        })

        const new_products: FullProduct[] = products.map((product) => ({
            ...product,
            price: product.price.toNumber()
        }))

        return { subCategorie, products: new_products }

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteProduct = async (id: string) => {
    try {
        await db.product.delete({
            where: {
                id
            }
        })

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateProduct = async ({ id, name, price }: { id: string, name?: string, price?: number }) => {
    try {
        await db.product.update({
            where: {
                id
            },
            data: {
                name,
                price
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getProductById = async (id: string) => {
    try {
        const product = await db.product.findUnique({
            where: {
                id
            },
            include: {
                Subcategory: true
            }
        })

        if (!product) {
            throw new Error("Product not found")
        }

        return {
            ...product,
            price: product.price.toNumber()
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}