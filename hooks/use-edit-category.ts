import { create } from "zustand";

interface ModalStore {
    id: string | undefined;
    getCategories: () => void;
    isOpen: boolean;
    onOpen: (getCategories: () => void, id?: string) => void,
    onClose: () => void;
}

export const useEditCategoryModal = create<ModalStore>((set) => ({
    id: undefined,
    isOpen: false,
    getCategories: () => { },
    onOpen: (getCategories, id) => set({ isOpen: true, getCategories, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));
