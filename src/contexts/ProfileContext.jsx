import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/supabase';
import { UserAuth } from './AuthContext';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
    const { user, loading: authLoading } = UserAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch profile từ Supabase
    const fetchProfile = async () => {
        if (!user) {
        setProfile(null);
        setLoading(false);
        return;
        }

        setLoading(true);
        setError(null);

        const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, coins, created_at')
        .eq('id', user.id)
        .single();

        if (error) {
        console.error('Fetch profile error:', error);
        setError(error);
        setProfile(null);
        } else {
        setProfile(data);
        }

        setLoading(false);
    };

    // Khi auth state thay đổi → reload profile
    useEffect(() => {
        if (authLoading) return;
        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, authLoading]);

    // Cho phép refetch thủ công (sau khi update avatar, reward coins…)
    const refetchProfile = () => fetchProfile();

    return (
        <ProfileContext.Provider
        value={{
            profile,        // { id, username, avatar_url, coins }
            loading,
            error,
            refetchProfile, // gọi khi cần sync lại
        }}
        >
        {children}
        </ProfileContext.Provider>
    );
    }

    // Hook dùng cho component
    export function useProfile() {
    const ctx = useContext(ProfileContext);
    if (!ctx) {
        throw new Error('useProfile must be used inside ProfileProvider');
    }
    return ctx;
    }
