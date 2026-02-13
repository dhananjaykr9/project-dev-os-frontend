// store/useSystemStore.ts
import { create } from "zustand";

// Define the available roles for the portfolio
export type SystemRole = "ALL" | "DATA_ENGINEER" | "ML_ENGINEER" | "AI_ENGINEER";

interface SystemState {
  activeRole: SystemRole;
  setActiveRole: (role: SystemRole) => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  activeRole: "ALL", // Default state
  setActiveRole: (role) => set({ activeRole: role }),
}));