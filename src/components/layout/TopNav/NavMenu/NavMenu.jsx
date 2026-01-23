import NavItem from './NavItem'

function NavMenu() {
    const items = [
        { icon: "", label: "Chơi trong phòng chung" },
        { icon: "", label: "Chơi trong phòng riêng" },
        { icon: "", label: "Hướng dẫn chơi" },
        { icon: "", label: "Bảng xếp hạng" },
        { icon: "", label: "Bạn bè" },
    ];

    return (
        <nav>
        {items.map((item) => (
            <NavItem key={item.label} {...item} />
        ))}
        </nav>
    );
}

export default NavMenu;