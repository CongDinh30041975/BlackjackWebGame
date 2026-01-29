import Logo from './Logo'
import NavMenu from './NavMenu/NavMenu'
import '../../../styles/Dashboard.css'

function TopNav() {
    return (
        <header className="top-nav">
            <Logo />
            <NavMenu />
        </header>
    )
};

export default TopNav;