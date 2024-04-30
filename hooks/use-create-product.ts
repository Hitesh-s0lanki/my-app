import { create } from "zustand";

interface ModalStore {
    id: string | undefined;
    getAllProducts: () => void;
    isOpen: boolean;
    onOpen: (getAllProducts: () => void, id?: string) => void,
    onClose: () => void;
}

export const useCreateProductModal = create<ModalStore>((set) => ({
    id: undefined,
    isOpen: false,
    getAllProducts: () => { },
    onOpen: (getAllProducts, id) => set({ isOpen: true, getAllProducts, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));
