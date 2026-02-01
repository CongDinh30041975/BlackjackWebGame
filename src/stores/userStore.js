import { create } from 'zustand'
import * as userServices from '../lib/supabase/user'

const useUserStore = create((set) => ({
    profile: null,
    loading: false,
    error: null,

    fetchProfile: async (userId) => {
        if (!userId) return

        set({ loading: true, error: null })

        const { data, error } = await userServices.getProfileById(userId)

        if (error) {
        set({ error, loading: false })
        } else {
        set({ profile: data, loading: false })
        }
    },

    updateAvatar: async (userId, file) => {
        set({ loading: true, error: null })

        const { success, avatarUrl, error } = await userServices.uploadAvatar(userId, file)

        if (success) {
            set((state) => ({
                profile: { ...state.profile, avatar_url: avatarUrl },
                loading: false,
                error: null
            }))
            return { success: true }
        } else {
            set({ error, loading: false })
            return { success: false, error }
        }
    },

    updateDisplayName: async (userId, newName) => {
        set({ loading: true, error: null })

        const { success, data, error } = await userServices.updateDisplayName(userId, newName)

        if (success) {
            set((state) => ({
                profile: { ...state.profile, display_name: data?.display_name ?? newName },
                loading: false,
                error: null
            }))
            return { success: true }
        } else {
            set({ error, loading: false })
            return { success: false, error }
        }
    },

    clearProfile: () => set({ profile: null })
}))

export default useUserStore;