import { supabase } from "./supabase";

/* ================= ROOMS ================= */

// Lấy 1 room bằng code
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
  
    return {
      data: room,
      error: null,
    };
  } catch (err) {
    console.error('fetchRoomByCode error:', err);
    return { data: null, error: err };
  }
}

// Lấy 1 phòng bằng roomId
export const fetchRoomById = async (roomId) => {
  try {
    const {data, error} = await supabase
      .from('rooms')
      .select('*')      
      .eq('id', roomId)
      .maybeSingle()

    if(error) throw error
    return {data: data, error: null}
  } catch (err) {
    console.error('Lỗi lấy phòng, ', err)
    return {data: null, error: err}
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
      .rpc('create_player', {room_id: roomId, user_id: userId})
    
    if (error) throw error;
    return {data, error: null}
  }

  catch (err) {
    console.error('Lỗi tạo player:', err);
    return { data: null, error: err };
  }
}

// Kiểm tra mình có player trong bảng đó đang hoạt động hay không
export async function fetchMyPlayer(roomId, userId) {
  try {
    const {data, error} = await supabase
      .from('players')
      .select('*')
      .eq('room_id', roomId)
      .eq('user_id', userId)
      .maybeSingle()

    if(error) throw error;
    if(data) {
      return {data: true, error: null}
    }
    return {data: false, error: null}
  }
  
  catch (err) {
    console.error('Lỗi lấy player, ', err)
    return {data: false, error: err}
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