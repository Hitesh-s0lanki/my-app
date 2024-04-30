import { create } from "zustand";

interface ModalStore {
    isOpen: boolean;
    onOpen: () => void,
    onClose: () => void;
}

export const useCreateCategorieModal = create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true, }),
    onClose: () => set({ isOpen: false }),
}));
