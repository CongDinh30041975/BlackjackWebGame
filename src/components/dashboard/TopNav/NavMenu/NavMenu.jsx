import NavItem from './NavItem'
import useAuthStore from '../../../../stores/authStore';
import '../../../../styles/Dashboard.css'

function NavMenu() {   
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    
    const baseItems = [
        { icon: "", label: "Chơi" },
        { icon: "", label: "Hướng dẫn chơi" },
        { icon: "", label: "Bảng xếp hạng" },
    ];

    const items = isLoggedIn 
        ? [
            ...baseItems,
            { icon: "", label: "Bạn bè" },
            { to: "/profile", icon: "", label: "Trang cá nhân" },
          ]
        : [
            ...baseItems,
            { to: "/register", icon: "", label: "Đăng ký" },
            { to: "/login", icon: "", label: "Đăng nhập" },
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