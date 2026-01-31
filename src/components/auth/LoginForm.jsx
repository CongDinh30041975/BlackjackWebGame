import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import EmailInput from "../common/EmailInput";
import PasswordInput from "../common/PasswordInput";
import '../../styles/AuthForm.css'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const login = useAuthStore((s) => s.login);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);

    const handleLogin = async (e) => {
        e.preventDefault();

        const success = await login(email, password);
        
        if (success) {
            alert('Đăng nhập thành công!');
        }
    };

    return (
        
        <form onSubmit={handleLogin}>
            <h2>Đăng nhập</h2>
            <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            
            {error && <div className="error-message">{error}</div>}
            
            <button className="summit" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>

            <div className="auth-links">
                <span>Chưa có tài khoản? <NavLink to="/register">Đăng ký</NavLink></span>
                <NavLink to="/forgot-password">Quên mật khẩu</NavLink>
            </div>
        </form>
    );
}

export default LoginForm;