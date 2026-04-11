import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  full_name: string;
  industry?: string;
  target_audience?: string;
  tone?: string;
  is_active: boolean;
  created_at: string;
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (data) => set((state) => ({ user: state.user ? { ...state.user, ...data } : null })),
}));
