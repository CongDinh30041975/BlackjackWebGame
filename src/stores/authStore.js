import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authService from "../lib/supabase/auth";

const useAuthStore = create(
    persist(
        (set) => ({
            session: null,
            user: null,
            isLoggedIn: false,
            loading: false,
            error: null,

            // Khôi phục session từ Supabase
            restoreSession: async () => {
                set({ loading: true });
                try {
                    const data = await authService.getSession?.();
                    if (data?.session) {
                        set({
                            session: data.session,
                            user: data.user,
                            isLoggedIn: true,
                            loading: false,
                        });
                    } else {
                        set({
                            session: null,
                            user: null,
                            isLoggedIn: false,
                            loading: false,
                        });
                    }
                } catch (err) {
                    set({
                        session: null,
                        user: null,
                        isLoggedIn: false,
                        error: err.message,
                        loading: false,
                    });
                }
            },

            register: async (email, password) => {
                set({ loading: true, error: null });

                try {
                    await authService.register(email, password);

                    set({ loading: false });

                    return true; // báo đăng ký thành công
                } catch (err) {
                    set({
                        error: err.message,
                        loading: false,
                    });
                    return false;
                }
            },

            login: async (email, password) => {
                set({ loading: true, error: null });

                try {
                    const data = await authService.login(email, password);

                    set({
                        session: data.session,
                        user: data.user,
                        isLoggedIn: true,
                        loading: false,
                    });

                    return true;
                } catch (err) {
                    set({
                        error: err.message,
                        loading: false,
                    });
                    return false;
                }
            },

            logout: async () => {
                set({ loading: true });

                await authService.logout?.();

                set({
                    session: null,
                    user: null,
                    isLoggedIn: false,
                    loading: false,
                });
            },
        }),
        {
            name: "auth-store",
            partialize: (s) => ({
                session: s.session,
                user: s.user,
                isLoggedIn: s.isLoggedIn,
            }),
        }
    )
);

export default useAuthStore;