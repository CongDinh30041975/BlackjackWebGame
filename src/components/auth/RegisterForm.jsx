import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { register } from "../../lib/supabase/auth";
import EmailInput from "../common/EmailInput";
import PasswordInput from "../common/PasswordInput";
import useAuthStore from '../../stores/authStore';
import '../../styles/AuthForm.css'

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const login = useAuthStore((s) => s.login);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const success = await login(email, password);
        
        if (success) {
            alert('Đăng ký thành công!');
        }
    };


    return (
        <form onSubmit={handleRegister}>
            <h2>Đăng ký</h2>
            <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <button className="summit" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>

            <p>Đã có tài khoản? <NavLink to={'/auth/login'}> Đăng nhập </NavLink></p>
            
        </form>
    );
};

export default RegisterForm;