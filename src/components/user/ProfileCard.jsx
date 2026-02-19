import { useState, useRef, useEffect } from "react";
import useAuthStore from "../../stores/authStore";
import useUserStore from "../../stores/userStore";
import { CiEdit } from "react-icons/ci";
import Avatar_placeholder from '../../assets/Avatar_placeholder.webp'
import "../../styles/ProfileCard.css"; 

function ProfileCard({ onLogout, onSave, onCancel }) {
    const logout = useAuthStore((s) => s.logout);
    const loading = useAuthStore((s) => s.loading);

    const profile = useUserStore((s) => s.profile);
    const updateAvatar = useUserStore((s) => s.updateAvatar);
    const updateDisplayName = useUserStore((s) => s.updateDisplayName);
    const clearProfile = useUserStore((s) => s.clearProfile);
    const error = useUserStore((s) => s.error);
    
    console.log(profile);

    const [name, setName] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (profile) {
            setName(profile.display_name || "Vô danh");
            setAvatarPreview(profile.avatar_url || null);
        }
    }, [profile]);

    const handleLogout = async (e) => {
        e && e.preventDefault();
        if (onLogout) return onLogout();

        const success = await logout();
        await clearProfile();

        if (success) {
            alert("Đăng xuất thành công!");
        } else {
            alert("Lỗi đăng xuất!");
        }
    };

    const handleEditClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;

        setAvatarFile(f); // Tạo avatar file để upload
        const url = URL.createObjectURL(f); // Tạo url để load lên giao diện
        setAvatarPreview(url);
    };

    const handleSave = async (e) => {
        e && e.preventDefault();
        if (onSave) return onSave({ name, avatar: avatarPreview });

        if (!profile) {
            alert('Không tìm thấy profile');
            return;
        }

        let didChange = false;

        // Update display name if changed
        const currentName = profile.display_name || '';
        if ((name || '').trim() !== (currentName || '').trim()) {
            const res = await updateDisplayName(profile.id, (name || '').trim());
            if (!res || !res.success) {
                alert('Lỗi khi cập nhật tên: ' + (res?.error || 'Không xác định'))
                return
            }
            didChange = true
        }

        // Update avatar if a new file was selected
        if (avatarFile) {
            const res = await updateAvatar(profile.id, avatarFile)
            if (!res || !res.success) {
                alert('Lỗi khi cập nhật avatar: ' + (res?.error || 'Không xác định'))
                return
            }
            didChange = true
        }

        if (didChange) alert('Lưu thay đổi thành công')
        else alert('Không có thay đổi')
    };

    const handleCancel = (e) => {
        e && e.preventDefault();
        if (onCancel) return onCancel();
        // reset to profile values
        if (profile) {
            setName(profile.full_name || "Ẩn danh");
            setAvatarPreview(profile.avatar_url || null);
        }
    };

    return (
        <div className="profile-card">
            <div className="left-col">
                <div className="avatar-wrapper">
                    <img
                        className="avatar-img"
                        src={avatarPreview || Avatar_placeholder}
                        alt="Ảnh đại diện"
                    />
                    <button
                        className="edit-avatar-btn"
                        onClick={handleEditClick}
                        aria-label="Chỉnh sửa ảnh"
                        type="button"
                    >
                        <CiEdit />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden-file-input"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>

                <label className="field-label">Tên hiển thị</label>
                <input
                    className="field-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="actions">
                    <button className="save-btn" onClick={handleSave} type="button">
                        Lưu thay đổi
                    </button>
                    <button className="cancel-btn" onClick={handleCancel} type="button">
                        Cancel
                    </button>
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                    disabled={loading}
                >
                    {loading ? "Đang xử lý..." : "Đăng xuất"}
                </button>
            </div>

            <div className="right-col">
                <div className="field-display">
                    <span className="field-label">Số xu</span>
                    <br />
                    <span className="field-value">{profile?.coins ?? 0}</span>
                </div>

                
            </div>
        </div>
    );
}

export default ProfileCard;