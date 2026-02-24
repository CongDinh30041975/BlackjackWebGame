import { useState } from 'react';
import { useLobbyStore } from "../../stores/lobbyStore"
import RoomCard from './RoomCard';
import { CiSearch } from "react-icons/ci";

const RoomLobby = () => {
  const [roomCode, setRoomCode] = useState('');

  const room = useLobbyStore((s) => s.room);
  const loading = useLobbyStore((s) => s.loading);
  const error = useLobbyStore((s) => s.error);
  
  const loadRoom = useLobbyStore((s) => s.loadRoom);
  

  const handleSearchRoom = async (e) => {
    e.preventDefault();

    await loadRoom(roomCode);
  }

  return (
    <div className="roomLobby">
      <div className="searchRoom">
        <legend>Tìm phòng theo mã</legend>
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
