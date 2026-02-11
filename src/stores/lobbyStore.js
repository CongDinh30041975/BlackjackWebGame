import { create } from 'zustand'
import {
  getPublicRooms,
  createLobbyChannel,
  removeChannel,
} from '../lib/supabase/room'

let refreshTimeout = null;

export const useLobbyStore = create((set, get) => ({
    rooms: [],
    loading: false,
    fetching: false,
    error: null,

    subscribed: false,
    channel: null,
    lastFetch: 0,

    // ===== LOAD =====
    loadRooms: async (force = false) => {
        const now = Date.now();
        if (!force && (get().fetching || now - get().lastFetch < 500)) return;

        set({ loading: true, fetching: true, error: null });

        const { data, error } = await getPublicRooms();

        if (error) {
        set({
            loading: false,
            fetching: false,
            error: error.message || "Failed to load rooms",
        });
        return;
        }

        set({
        rooms: data,
        lastFetch: Date.now(),
        loading: false,
        fetching: false,
        });
    },

    // ===== SUBSCRIBE =====
    subscribe: () => {
        if (get().subscribed) return;

        const { channel, error } = createLobbyChannel(() => {
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => {
            get().loadRooms();
        }, 200);
        });

        if (error) {
        set({ error: "Realtime connection failed" });
        return;
        }

        set({ subscribed: true, channel });
    },

    // ===== UNSUB =====
    unsubscribe: async () => {
        await removeChannel(get().channel);
        set({ subscribed: false, channel: null });
    },

    refresh: () => get().loadRooms(true),
    clearError: () => set({ error: null }),
}));