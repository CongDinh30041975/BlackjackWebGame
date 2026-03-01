import { useMemo } from 'react'
import { useEffect } from 'react'
import Mat_image from '../../assets/Mat_image.webp'
import PlayerDisplay from './PlayerDisplay'
import {useGameStore} from '../../stores/gameStore'
import { deleteMyPlayer } from '../../lib/supabase/room'
import '../../styles/GameplayScreen.css'

const GamePlayScreen = () => {
  const max1p = [
    {className: 'p0_n'},
    {className: 'p1_n'}
  ]

  const max3p = [
    ...max1p,
    {className: 'p2_4'},
    {className: 'p3_4'}
  ]

  const max5p = [
    ...max1p,
    {className: 'p2_6'},
    {className: 'p3_6'},
    {className: 'p4_6'},
    {className: 'p5_6'},
  ]
  
  const room = useGameStore((s) => s.room)
  const players = useGameStore((s) => s.players)
  const me = useGameStore((s) => s.me)
  const host = useGameStore((s) => s.host)

  const loading = useGameStore((s) => s.loading)
  const error = useGameStore((s) => s.error)

  const initRoom = useGameStore((s) => s.initRoom)
  const cleanup = useGameStore((s) => s.cleanup)

  useEffect(() => {    
    if (room) {
      initRoom(room.id)
    }
  }, [])

  const sortPlayers = useMemo(() => {
    if (!players || !me) return []

    const others = players.filter(
      p => p.id !== me.id && !p.is_host
    )

    return me.is_host
      ? [me, ...others]
      : [me, host, ...others]
  }, [players, me, host])

  const handleLeaveRoom = async () => {
    await deleteMyPlayer(me.id)
    cleanup();
  }


  // Tạo layout chỗ ngồi
  let seatLayout = []
  if(room.max_players <= 1) {
    seatLayout = max1p.slice(0, room.max_players + 1)
  }
  else if(room.max_players <= 3) {
    seatLayout = max3p.slice(0, room.max_players + 1)
  }
  else {
    seatLayout = max5p.slice(0, room.max_players + 1)
  }

  return (
    <div className='gameplayScreen'>
      <div className='room-info'>
        <span className='roomCode'>Mã phòng: {room.room_code}</span>
        <span>Mức cược: {room.bet_amount}</span>
      </div>
      

      <div className='mat'>
        <img className='mat_image' src={Mat_image} alt="Ảnh cái chiếu" />

        {/* Hiển thị các player lên UI */}
        {sortPlayers.map((p, i) => {
          const seat = seatLayout[i] || {}
          const { display_name, avatar_url, coins } = p.profiles || {}

          return (
            <PlayerDisplay
              key={p.id}
              className={seat.className}
              displayName={display_name}
              avatarUrl={avatar_url}
              coins={coins}
              isHost={p.is_host}
            />
          )
        })}

        
      </div>
      
      <button className='leave' onClick={handleLeaveRoom}>Rời phòng</button>
    </div>
  )
}

export default GamePlayScreen
