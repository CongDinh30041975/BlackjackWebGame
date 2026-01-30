import React, { useState } from 'react';
import { BiShow, BiHide } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import '../../styles/Common.css'

function PasswordInput({ value, onChange }) {
    const [ hidePassword, setHidePassword ] = useState(true);

    // Hàm đảo ngược trạng thái ẩn/hiện
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    return (
        <div className='input-box'>
            <input
                type={hidePassword ? 'password' : 'text'}
                className={hidePassword ? 'password-hidden' : 'password-visible'}
                placeholder='Mật khẩu'
                value={value}
                onChange={onChange}
                required
            />

            <span onClick={togglePasswordVisibility} className='password-toggle'>
                {hidePassword ? <BiHide/> : <BiShow/>}
            </span>

            <i className='icon'><IoKeyOutline/></i>
        </div>
    );
}

export default PasswordInput;