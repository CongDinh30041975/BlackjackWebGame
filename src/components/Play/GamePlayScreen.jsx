import Mat_image from '../../assets/Mat_image.webp'
import PlayerDisplay from './PlayerDisplay'
import Avatar_placeholder from '../../assets/Avatar_placeholder.webp'
import useUserStore from '../../stores/userStore'
import '../../styles/GameplayScreen.css'



const GamePlayScreen = () => {
  const max2p = [
    {className: 'p0_n'},
    {className: 'p1_n'}
  ]

  const max4p = [
    ...max2p,
    {className: 'p2_4'},
    {className: 'p3_4'}
  ]

  const max6p = [
    ...max2p,
    {className: 'p2_6'},
    {className: 'p3_6'},
    {className: 'p4_6'},
    {className: 'p5_6'},
  ]

  return (
    <div className='gameplayScreen'>
      <div className='mat'>
        <img className='mat_image' src={Mat_image} alt="Ảnh cái chiếu" />
        {max6p.map((player) => (
          <PlayerDisplay key={player.className} {...player} />
        ))}
      </div>
      
    </div>
  )
}

export default GamePlayScreen
