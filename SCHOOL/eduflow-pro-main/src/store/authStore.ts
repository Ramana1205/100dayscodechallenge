import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const DEMO_CREDENTIALS: Record<string, { password: string; role: UserRole; name: string }> = {
  admin: { password: 'admin123', role: 'admin', name: 'Administrator' },
  faculty: { password: 'faculty123', role: 'faculty', name: 'Faculty Member' },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (username: string, password: string) => {
        const cred = DEMO_CREDENTIALS[username];
        if (cred && cred.password === password) {
          set({
            user: { username, role: cred.role, name: cred.name },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
