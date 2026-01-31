import { create } from 'zustand'
import { getProfileById } from '../lib/supabase/user'

const useUserStore = create((set) => ({
    profile: null,
    loading: false,
    error: null,

    fetchProfile: async (userId) => {
        if (!userId) return

        set({ loading: true, error: null })

        const { data, error } = await getProfileById(userId)

        if (error) {
        set({ error, loading: false })
        } else {
        set({ profile: data, loading: false })
        }
    },

    clearProfile: () => set({ profile: null })
}))

export default useUserStore;