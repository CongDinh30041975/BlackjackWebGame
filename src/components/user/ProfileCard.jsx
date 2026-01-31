import useAuthStore from "../../stores/authStore";
import useUserStore from "../../stores/userStore";

function ProfileCard() {
    const logout = useAuthStore((s) => s.logout);    
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);

    const clearProfile = useUserStore((s) => s.clearProfile);

    const handleLogout = async (e) => {
        e.preventDefault();

        const success = await logout();
        await clearProfile();

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