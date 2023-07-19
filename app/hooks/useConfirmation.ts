import { create } from 'zustand';

interface ConfirmationStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onConfirm: () => void; // Add onConfirm function to the interface
}

const useConfirmation = create<ConfirmationStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onConfirm: () => {}, // Placeholder function for onConfirm
}));

export default useConfirmation;
