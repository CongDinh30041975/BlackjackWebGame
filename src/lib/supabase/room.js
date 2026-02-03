import { supabase } from "./supabase";

/* ================= ROOMS ================= */

export async function fetchRoomByCode(code) {
    const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('code', code)
        .single()

    if (error) throw error
    return data
}

export async function joinRoom(roomId, userId) {
    const { error } = await supabase
        .from('room_players')
        .insert({
        room_id: roomId,
        user_id: userId
        })

    if (error) throw error
}

export async function leaveRoom(roomId, userId) {
    const { error } = await supabase
        .from('room_players')
        .delete()
        .eq('room_id', roomId)
        .eq('user_id', userId)

    if (error) throw error
}

export async function fetchRoomPlayers(roomId) {
    const { data, error } = await supabase
        .from('room_players')
        .select('*')
        .eq('room_id', roomId)
        .order('seat_index')

    if (error) throw error
    return data
}

/* ================= REALTIME ================= */

export function subscribeRoomPlayers(roomId, onChange) {
  const channel = supabase
    .channel(`room:${roomId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'room_players',
        filter: `room_id=eq.${roomId}`
      },
      onChange
    )
    .subscribe()

  return channel
}