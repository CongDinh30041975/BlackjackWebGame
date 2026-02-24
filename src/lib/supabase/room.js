import { supabase } from "./supabase";

/* ================= ROOMS ================= */
// Đếm số người chơi trong 1 phòng
export async function countPlayersInRoom(roomId) {
  try {
    const { data, error } = await supabase
      .rpc('count_players_in_room', { room_id: roomId })

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (err) {
    console.error("countPlayersInRoom error:", err);
    return { data: [], error: err };
  }
}

// Lấy 1 room bằng code và đếm số người chơi
export async function fetchRoomByCode(roomCode) {
  try {
    // lấy thông tin phòng
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('*')
      .eq('room_code', roomCode)
      .maybeSingle();

    if (roomError) throw roomError;
    if (!room) return { data: null, error: null };

    // Lấy sô player
    const {data: playerCount, error: playerCountError} = await countPlayersInRoom(room.id);
    if(playerCountError) throw playerCountError;
  
    return {
      data: { ...room, player_count: playerCount ?? 0 },
      error: null,
    };
  } catch (err) {
    console.error('fetchRoomByCode error:', err);
    return { data: null, error: err };
  }
}

// Lấy danh sách các phòng public
export async function getPublicRooms() {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('is_public', true);

      if (error) throw error;

      return { data: data ?? [], error: null };
    } catch (err) {
      console.error("getPublicRooms error:", err);
      return { data: [], error: err };
    }
}

// Code liên quan đến gameplay
// Tạo player
export async function createPlayer(roomId, userId) {
  try {
    const { data, error } = await supabase
      .from('players')
      .insert({room_id: roomId, user_id: userId})
      .select()
      .single()
    
    if (error) throw error;
    return {data, error: null}
  }

  catch (err) {
    console.error('Lỗi tạo player:', err);
    return { data: null, error: err };
  }
}

// Lấy danh sách player
export async function fetchPlayers(roomId) {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('room_id', roomId)

    if(error) throw error;
    return {data, error: null};
  }

  catch (err) {
    console.error('Lỗi lấy danh sách player:', err);
    return { data: null, error: err };
  }
}

// Realtime cho game
export function subscribeRoom(roomId, callbacks) {
  return supabase
    .channel(`room:${roomId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'rooms',
      filter: `id=eq.${roomId}`
    }, (payload) => {
      callbacks.onRoomChange(payload.new)
    })
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'players',
      filter: `room_id=eq.${roomId}`
    }, (payload) => {
      callbacks.onPlayerChange(payload.eventType, payload.new || payload.old)
    })
    .subscribe()
}