import { create } from 'zustand'
import {useAuthStore} from './authStore'
import {
    createPlayer,
    fetchPlayers,
    fetchPlayers,
    subscribeRoom,
} from '../lib/supabase/room'

export const useGameStore = create((set, get) => ({
    room: null,
    players: [],
    me: null,
    host: null,
    channel: null,

    loading: false,
    error: null,

    userId: useAuthStore((s) => s.user.id),

    initRoom: async (room, userId) => {
        set({ loading: true, error: null })

        try {
            const [players] = await fetchPlayers(room.id)

            const me = players.find(p => p.user_id === userId) ?? null
            const host = players.find(p => p.is_host) ?? null

            const channel = subscribeRoom(roomId, {
                onRoomChange: (newRoom) => {
                    set({ room: newRoom })
                },
                onPlayerChange: (event, player) => {
                    set((state) => {
                        let updated

                        if (event === 'INSERT') {
                            updated = [...state.players, player]
                        } else if (event === 'UPDATE') {
                            updated = state.players.map(p => p.id === player.id ? player : p)
                        } else {
                            updated = state.players.filter(p => p.id !== player.id)
                        }

                        return {
                            players: updated,
                            me: updated.find(p => p.user_id === userId) ?? null,
                            host: updated.find(p => p.is_host) ?? null,
                        }
                    })
                }
            })

            set({ room, players, me, host, channel })
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    },

    cleanup: () => {
        get().channel?.unsubscribe()
        set({ room: null, players: [], me: null, host: null, channel: null, loading: false, error: null })
    }

}))