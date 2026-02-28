import AllCard from '../../assets/AllCard_sprite.webp'

const CardDisplay = ({ rank = 1, suit = 1, width = '45px', left = 0 }) => {
    const posX = ((rank - 1) / 12) * 100;
    const posY = ((suit - 1) / 3) * 100;
    const w = 2913/13, h = 1253/4

    const cardStyle = {
        position: 'absolute',
        width: width,
        aspectRatio: `${w}/${h}`,
        backgroundImage: `url(${AllCard})`,
        backgroundSize: '1300% 400%',
        backgroundPosition: `${posX}% ${posY}%`,
        backgroundRepeat: 'no-repeat',
        top: '25%',
        left: left
    }

  return (
    <div style={cardStyle} />
  )
}

export default CardDisplay
