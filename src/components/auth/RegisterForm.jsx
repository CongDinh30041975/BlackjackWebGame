import React, { useState } from 'react';
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
            <p>Đăng ký</p>
            <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <button className="summit" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
        </form>
    );
};

export default RegisterForm;