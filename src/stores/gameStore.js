import { create } from 'zustand'
import useAuthStore from './authStore'
import {
    createPlayer,
    fetchPlayers,
    subscribeRoom,
} from '../lib/supabase/room'

const useGameStore = create((set, get) => ({
    room: null,
    players: [],
    me: null,
    host: null,
    channel: null,

    loading: false,
    error: null,

    initRoom: async (room) => {
        set({ loading: true, error: null })

        try {
            const [players] = await fetchPlayers(room.id)

            const currentUserId = useAuthStore.getState().user?.id || null
            const me = players.find(p => p.user_id === currentUserId) ?? null
            const host = players.find(p => p.is_host) ?? null

            const channel = subscribeRoom(room.id, {
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

                        const currentUserId = useAuthStore.getState().user?.id || null
                        return {
                            players: updated,
                            me: updated.find(p => p.user_id === currentUserId) ?? null,
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

export default useGameStore;