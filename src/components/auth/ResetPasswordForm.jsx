import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { sendResetPasswordEmail, updatePassword } from '../../lib/supabase/auth'
import useAuthStore from '../../stores/authStore';
import EmailInput from "../common/EmailInput";
import PasswordInput from '../common/PasswordInput'
import '../../styles/AuthForm.css'

function ResetPasswordForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('')
    const [isRecovery, setIsRecovery] = useState(false)
    const [done, setDone] = useState(false)
    
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);
    const sendResetEmail = useAuthStore((s) => s.sendResetEmail);
    const checkRecoverySession = useAuthStore((s) => s.checkRecoverySession);
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

    // Check xem đang ở step nào
    useEffect(() => {
        checkRecoverySession().then(setIsRecovery)
    }, [])

    async function handleSendEmail(e) {
        e.preventDefault()

        const succcess = await sendResetEmail(email)
        if (succcess) setDone(true)
    }

    async function handleUpdatePassword(e) {
        e.preventDefault()

        try {
            await updatePassword(password)
        } catch (err) {
            alert(err.message)
        }
    }

    return (        
        <>
            {!isRecovery ? (
                <form onSubmit={handleSendEmail}>
                    <h2>Đặt lại mật khẩu</h2>
                    <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button className="summit" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Gửi email'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleUpdatePassword}>
                    <h2>Đặt lại mật khẩu</h2>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button className="summit" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
                    </button>
                </form>
            )}
        </>
        
    );
}

export default ResetPasswordForm;