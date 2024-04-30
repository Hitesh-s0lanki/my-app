import { create } from "zustand";

interface ModalStore {
    getCategories: () => void;
    isOpen: boolean;
    onOpen: (getCategories: () => void) => void,
    onClose: () => void;
}

export const useCreateCategorieModal = create<ModalStore>((set) => ({
    getCategories: () => { },
    isOpen: false,
    onOpen: (getCategories) => set({ isOpen: true, getCategories }),
    onClose: () => set({ isOpen: false }),
}));
