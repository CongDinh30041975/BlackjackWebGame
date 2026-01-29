import { NavLink } from "react-router-dom";
import '../../../../styles/Dashboard.css'

function NavItem({ to, icon, label }) {
    return (
        <NavLink to={to} className="nav-item">
        {icon}
        <span>{label}</span>
        </NavLink>
    );
}


export default NavItem;