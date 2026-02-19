import Mat_image from '../../assets/Mat_image.webp'
import PlayerDisplay from './PlayerDisplay'
import Avatar_placeholder from '../../assets/Avatar_placeholder.webp'
import useUserStore from '../../stores/userStore'
import '../../styles/GameplayScreen.css'

const GamePlayScreen = () => {
  const profile = useUserStore((s) => s.profile);

  return (
    <div className='gameplayScreen'>
      <div className='mat'>
        <img className='mat_image' src={Mat_image} alt="Ảnh cái chiếu" />
        <PlayerDisplay 
          displayName={profile?.display_name || 'Vô danh'} 
          avatarUrl={profile?.avatar_url || Avatar_placeholder}
          coins={profile?.coins}
        />
      </div>
      
    </div>
  )
}

export default GamePlayScreen
