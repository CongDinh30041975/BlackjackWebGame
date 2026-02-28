import Avatar_placeholder from '../../assets/Avatar_placeholder.webp'
import Coin_icon from '../../assets/Coin_icon.svg'
import CardDisplay from './CardDisplay'
import '../../styles/PlayerDisplay.css'

const PlayerDisplay = ({ displayName, avatarUrl, coins, className }) => {
  const wrapperClass = ['player_wrapper', className].filter(Boolean).join(' ')
  return (
    <div className={wrapperClass}>
      <span className='coins'>
        <img src={Coin_icon} alt='coin' className='coin_icon' />
        {coins || 0}
      </span>
      <img className='avatar_img' src={avatarUrl ?? Avatar_placeholder} alt='Ảnh đại diện'/>
      <span className='displayName'>{displayName || 'Vô danh'}</span>
    </div>
  )
}

export default PlayerDisplay
