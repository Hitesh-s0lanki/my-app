import { Categorie, Product, SubCategorie } from '@prisma/client';

export type FullCategorie =
    Categorie & {
        SubCategorie: SubCategorie[]
    }

export type FullSubCategorie = SubCategorie & {
    Products: {
        id: string;
        name: string;
        price: number;
    }[],
    Categorie: Categorie
}

export type FullProduct = {
    id: string,
    name: string,
    subcategory_id: string;
    price: number;
    Subcategory: SubCategorie;
}