import NavItem from './NavItem'
import '../../../../styles/Dashboard.css'

function NavMenu() {
    const items = [
        { icon: "", label: "Chơi trong phòng chung" },
        { icon: "", label: "Chơi trong phòng riêng" },
        { icon: "", label: "Hướng dẫn chơi" },
        { icon: "", label: "Bảng xếp hạng" },
        { icon: "", label: "Bạn bè" },
        { to: "/RegisterPage", icon: "", label: "Đăng ký" },
    ];

    return (
        <nav className='nav-menu'>
        {items.map((item) => (
            <NavItem key={item.label} {...item} />
        ))}
        </nav>
    );
}

export default NavMenu;