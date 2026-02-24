import { create } from 'zustand'
import {
  fetchRoomByCode,
} from '../lib/supabase/room'

export const useLobbyStore = create((set, get) => ({
    room: null,
    loading: false,
    error: null,

    // ===== LOAD =====
    loadRoom: async (roomCode) => {
        set({ loading: true, error: null });

        const { data, error } = await fetchRoomByCode(roomCode);

        if (error) {
            set({
                loading: false,
                error: error.message || "Failed to load room",
            });
            
            return;
        }

        set({
            room: data,
            loading: false,
        });
    },
}));