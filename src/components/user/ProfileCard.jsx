import useAuthStore from "../../stores/authStore";

function ProfileCard() {
    const logout = useAuthStore((s) => s.logout);    
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);

    const handleLogout = async (e) => {
        e.preventDefault();

        const success = await logout();

        if (success) {
            alert('Đăng xuất thành công!');
        } else {
            alert('Lỗi đăng xuất!');
        }
    }

    return (
        <div>
            <h2>Trang cá nhân</h2>
            <button onClick={handleLogout} disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng xuất'}
            </button>
        </div>
        
    )
}

export default ProfileCard;