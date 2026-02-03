import { create } from "zustand";
import * as roomService from '../lib/supabase/room'
import useAuthStore from "./authStore";

export const useRoomStore = create((set, get) => ({
    room: null,
    players: [],
    channel: null,
    loading: false,
    error: null,

    /* ========= DERIVED ========= */
    get joined() {
        return !!get().room
    },

    /* ========= ACTIONS ========= */

    enterRoomByCode: async (code) => {
        set({ loading: true })

        try {
            const userId = useAuthStore.getState().user.id
            const room = await roomService.fetchRoomByCode(code)

            await roomService.joinRoom(room.id, userId)

            const players = await roomService.fetchRoomPlayers(room.id)
            const channel = roomService.subscribeRoomPlayers(
                room.id,
                (payload) => {
                set((state) => ({
                    players: applyRoomPlayerChange(state.players, payload)
                }))
                }
            )

            set({ room, players, channel })
        } finally {
            set({ loading: false })
        }
    },
}))
