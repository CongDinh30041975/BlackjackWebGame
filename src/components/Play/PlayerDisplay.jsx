import Avatar_placeholder from '../../assets/Avatar_placeholder.webp'
import Coin_icon from '../../assets/Coin_icon.svg'
import '../../styles/PlayerDisplay.css'

const PlayerDisplay = ({ displayName, avatarUrl, coins }) => {
  return (
    <div className='player_wrapper'>
      <span className='coins'>
        <img src={Coin_icon} alt='coin' className='coin_icon' />
        {coins}
      </span>
      <img className='avatar_img' src={avatarUrl} alt={Avatar_placeholder} />
      <span className='displayName'>{displayName}</span>
    </div>
  )
}

export default PlayerDisplay
