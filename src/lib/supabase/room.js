import { supabase } from "./supabase";

/* ================= ROOMS ================= */

export async function fetchRoomByCode(code) {
    const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('room_code', code)
        .single()

    if (error) throw error
    return data
}

