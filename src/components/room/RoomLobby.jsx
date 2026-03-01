import { useState } from 'react';
import { useLobbyStore } from "../../stores/lobbyStore"
import { useGameStore } from '../../stores/gameStore'
import { createRoom } from '../../lib/supabase/room';
import RoomCard from './RoomCard';
import { CiSearch } from "react-icons/ci";

const RoomLobby = () => {
  const [betAmount, setBetAmount] = useState(100)
  const [maxPlayers, setMaxPlayers] = useState(5)
  const [roomCode, setRoomCode] = useState('');

  const room = useLobbyStore((s) => s.room);
  const loading = useLobbyStore((s) => s.loading);
  const error = useLobbyStore((s) => s.error);
  
  const loadRoom = useLobbyStore((s) => s.loadRoom);
  
  const {initRoom} = useGameStore()

  const handleSearchRoom = async (e) => {
    e.preventDefault();

    await loadRoom(roomCode);
  }

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    const {data: roomId} = await createRoom(betAmount, maxPlayers)
    initRoom(roomId)
  }

  return (
    <div className="roomLobby">
      <div className='createRoom'>
        <h4>Tạo phòng mới</h4>
        <span>Chọn mức cược: </span>
        <select name="betAmount" id="betAmount" 
          value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))}>

          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
        </select>
        <br />

        <span>Chọn số người chơi tối đa (Không tính host): </span>
        <select name="maxPlayers" id="maxPlayers" 
          value={maxPlayers} onChange={(e) => setMaxPlayers(Number(e.target.value))}>

          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />

        <button className='create' onClick={handleCreateRoom}>Tạo phòng</button>
      </div>

      <span>hoặc</span>

      <div className="searchRoom">
        <h4>Tìm phòng theo mã</h4>
        <input type="text" className="roomCode" placeholder="Nhập mã phòng"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />        

        <button className='search' onClick={handleSearchRoom}>
          <CiSearch />
        </button>
      </div>

      <RoomCard room={room}/>
    </div>
  )
}

export default RoomLobby
