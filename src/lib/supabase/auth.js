import { supabase } from "./supabase";

export const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
}

export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
}

export const sendResetPasswordEmail = async (userEmail) => {
    if (!userEmail) {
        throw new Error('Email không được để trống')
    }

    const { error } = await supabase.auth.resetPasswordForEmail(
        userEmail,
        {redirectTo: `${window.location.origin}/resetPassword`},
    );
    if (error) throw error;
    return true;
}

export const updatePassword = async (newPassword) => {
    const { session } = await getSession();
      if (!session) {
        throw new Error('Phiên reset không hợp lệ hoặc đã hết hạn')
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    })
    
    if (error) {
        throw error
    }
    return true
}

export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data;
}  