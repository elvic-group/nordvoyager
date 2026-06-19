import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  sidebarSection: 'overview' | 'budget' | 'packing' | 'map';
  toggleSidebar: () => void;
  setSidebarSection: (section: 'overview' | 'budget' | 'packing' | 'map') => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  sidebarSection: 'overview',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarSection: (sidebarSection) => set({ sidebarSection }),
}));
