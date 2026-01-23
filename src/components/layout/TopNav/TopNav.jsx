import Logo from './Logo'
import NavMenu from './NavMenu/NavMenu'
import RegisterButton from './RegisterButton'
import LoginButton from './LoginButton'

function TopNav() {
    return (
        <header className="top-nav">
            <Logo />
            <NavMenu />
            <RegisterButton />
            <LoginButton />
        </header>
    )
};

export default TopNav;