import { create } from "zustand";

interface ModalStore {
    getSubCategories: () => void;
    id: string | undefined;
    isOpen: boolean;
    onOpen: (getSubCategories: () => void, id?: string) => void,
    onClose: () => void;
}

export const useCreateSubCategorieModal = create<ModalStore>((set) => ({
    getSubCategories: () => { },
    id: undefined,
    isOpen: false,
    onOpen: (getSubCategories, id) => set({ isOpen: true, id, getSubCategories }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));
