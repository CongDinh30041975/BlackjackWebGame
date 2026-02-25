import Mat_image from '../../assets/Mat_image.webp'
import PlayerDisplay from './PlayerDisplay'
import useGameStore from '../../stores/gameStore'
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

  const cleanup = useGameStore((s) => s.cleanup)

  const handleLeaveRoom = () => {
    cleanup();
  }

  return (
    <div className='gameplayScreen'>
      <div className='mat'>
        <img className='mat_image' src={Mat_image} alt="Ảnh cái chiếu" />
        {max5p.map((player) => (
          <PlayerDisplay key={player.className} {...player} />
        ))}
        <button className='leave' onClick={handleLeaveRoom}>Rời phòng</button>
      </div>
      
    </div>
  )
}

export default GamePlayScreen
