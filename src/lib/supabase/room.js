import { supabase } from "./supabase";

/* ================= ROOMS ================= */

// Lấy danh sách các phòng public
export async function getPublicRooms() {
    try {
        const { data, error } = await supabase.rpc("get_public_rooms");

        if (error) throw error;

        return { data: data ?? [], error: null };
    } catch (err) {
        console.error("getPublicRooms error:", err);
        return { data: [], error: err };
    }
}

// ===== REALTIME CHANNEL =====
export function createLobbyChannel(onChange) {
  try {
    const channel = supabase
      .channel("lobby-rooms")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "players" },
        onChange
      )
      .subscribe();

    return { channel, error: null };
  } catch (err) {
    console.error("createLobbyChannel error:", err);
    return { channel: null, error: err };
  }
}

// ===== REMOVE CHANNEL =====
export async function removeChannel(channel) {
  try {
    if (channel) await supabase.removeChannel(channel);
  } catch (err) {
    console.error("removeChannel error:", err);
  }
}

export async function fetchRoomByCode(code) {
    const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('room_code', code)
        .single()

    if (error) throw error
    return data
}

