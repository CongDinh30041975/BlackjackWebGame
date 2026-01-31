import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { register } from "../../lib/supabase/auth";
import EmailInput from "../common/EmailInput";
import PasswordInput from "../common/PasswordInput";
import '../../styles/RegisterForm.css'

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await register(email, password);
            alert('Đăng ký thành công!');
            setEmail('');
            setPassword('');
        }
        catch(error) {
            alert(`Lỗi: ${error.message}`)
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <form className="register-container" onSubmit={handleRegister}>
            <h2>Đăng ký</h2>
            <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <button className="summit" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>

            <p>Đã có tài khoản? <NavLink to={'/login'}> Đăng nhập </NavLink></p>
            
        </form>
    );
};

export default RegisterForm;