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
  
    return { data: room };
  } catch (err) {
    console.error('fetchRoomByCode error:', err);
    return { data: null };
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
    return {data: data }
  } catch (err) {
    console.error('Lỗi lấy phòng, ', err)
    return {data: null }
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

      return { data: data ?? [] };
    } catch (err) {
      console.error("getPublicRooms error:", err);
      return { data: [] };
    }
}

// Tạo phòng mới với bản thân là host
export const createRoom = async (betAmount, maxPlayers) => {
  try {
    const { data, error } = await supabase
      .rpc('create_room_with_host', 
        {bet_amount: betAmount},
        {max_players: maxPlayers})

    if(error) throw error
    return {data}
    
  } catch (error) {
    console.error('Lỗi tạo phòng, ', error)
    return {data: null}
  }
}

// Code liên quan đến gameplay
// Tạo player
export async function createPlayer(roomId, userId) {
  try {
    const { data, error } = await supabase
      .rpc('create_player', {room_id: roomId, user_id: userId})
    
    if (error) throw error;
    return { data }
  }

  catch (err) {
    console.error('Lỗi tạo player:', err);
    return { data: null };
  }
}

// Xóa player của mình (Dùng cho thoát phòng)
export const deleteMyPlayer = async (playerId) => {
  try {
    const {error} = await supabase
      .from('players')
      .delete()
      .eq('id', playerId)

    if(error) throw error
    return {data: true}

  } catch (error) {
    console.error('Lỗi xóa player, ', error)
    return {data: false}
  }
}

// Kiểm tra mình có player trong bảng đó đang hoạt động hay không
export async function hasPlayerInRoom(roomId) {
  try {
    const {data, error} = await supabase
      .rpc('is_player_in_room', {p_room_id: roomId})

    if(error) throw error;
    if(data) {
      return {data: true}
    }
    return {data: false}

  } catch (err) {
    console.error('Lỗi lấy player, ', err)
    return {data: false}
  }
}

// Lấy danh sách player
export async function fetchPlayers(roomId) {
  try {
    const { data, error } = await supabase
      .from('players')
      .select(`
        *,
        profiles (
          display_name,
          avatar_url,
          coins
        )`
      )
      .eq('room_id', roomId)

    if(error) throw error;
    return {data};
  }

  catch (err) {
    console.error('Lỗi lấy danh sách player:', err);
    return { data: null };
  }
}

// Realtime cho game
export function subscribeRoom(roomId, callbacks) {
  const channel = supabase
    .channel(`room:${roomId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'rooms',
      filter: `id=eq.${roomId}`
    }, (payload) => {
      console.log('Room change:', payload)
      callbacks.onRoomChange(payload.new)
    })
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'players',
      filter: `room_id=eq.${roomId}`
    }, (payload) => {
      console.log('Player change payload:', payload)

      const data = payload.eventType === 'DELETE' 
        ? payload.old 
        : payload.new

      callbacks.onPlayerChange(payload.eventType, data)
    })
    .subscribe((status) => {
      console.log('Subscription status:', status)
    })

  return channel
}