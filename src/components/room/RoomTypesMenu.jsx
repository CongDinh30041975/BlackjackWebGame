import { NavLink } from "react-router-dom";

const RoomTypesMenu = () => {
  return (
    <div>
      <NavLink to='/play/publicRooms'> Phòng công khai </NavLink>
      <NavLink to='/'> Phòng riêng </NavLink>
    </div>
  )
}

export default RoomTypesMenu;