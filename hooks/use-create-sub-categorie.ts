import { create } from "zustand";

interface ModalStore {
    id: string | undefined;
    isOpen: boolean;
    onOpen: (id?: string) => void,
    onClose: () => void;
}

export const useCreateSubCategorieModal = create<ModalStore>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));
