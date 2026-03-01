import { create } from 'zustand'
import { persist } from "zustand/middleware";
import useAuthStore from './authStore'
import { supabase } from '../lib/supabase/supabase';
import {
    fetchRoomById,
    createPlayer,
    hasPlayerInRoom,
    fetchPlayer,
    fetchPlayers,
    subscribeRoom,
} from '../lib/supabase/room'

export const useGameStore = create(
    persist(
        (set, get) => ({
        room: null,
        players: [],
        me: null,
        host: null,
        channel: null,

        loading: false,
        error: null,


        initRoom: async (roomId) => {
            set({loading: true, error: null })

            try {
                const {data: room} = await fetchRoomById(roomId)
                const currentUserId = useAuthStore.getState().user?.id || null

                // Kiểm tra có player không
                const {data: exist} = await hasPlayerInRoom(roomId)
                if(!exist) {
                    await createPlayer(roomId, currentUserId)
                }            
                const { data: players} = await fetchPlayers(roomId)
                
                const me = players.find(p => p.user_id === currentUserId) ?? null
                const host = players.find(p => p.is_host) ?? null

                const existingChannel = get().channel
                if (existingChannel) {
                    existingChannel.unsubscribe()
                }
            
                const channel = subscribeRoom(room.id, {
                    onRoomChange: (newRoom) => {
                        set({ room: newRoom })
                    },
                    onPlayerChange: async (event, player) => {
                        console.log('Player event:', event, player)

                        if (event === 'INSERT') {
                            const { data: playerWithProfile } = await fetchPlayer(player.id)
                            set((state) => {
                                const updated = [...state.players, playerWithProfile]
                                return {
                                    players: updated,
                                    me: updated.find(p => p.user_id === currentUserId) ?? null,
                                    host: updated.find(p => p.is_host) ?? null,
                                }
                            })

                        } else {
                            set((state) => {
                                let updated
                                if (event === 'UPDATE') {
                                    updated = state.players.map(p => p.id === player.id ? { ...p, ...player } : p)
                                } else if (event === 'DELETE') {
                                    updated = state.players.filter(p => p.id !== player.id)
                                } else {
                                    console.warn('Unknown event type:', event)
                                    updated = state.players
                                }
                                return {
                                    players: updated,
                                    me: updated.find(p => p.user_id === currentUserId) ?? null,
                                    host: updated.find(p => p.is_host) ?? null,
                                }
                            })
                        }
                    }
                })
                console.log('subscribed to room', room.id, 'channel', channel)

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

    }),
    {
        name: 'game-store',
        // avoid storing the realtime channel (circular) in localStorage
        partialize: (state) => {
            const { channel, ...rest } = state
            return rest
        },
        version: 1
    }
))