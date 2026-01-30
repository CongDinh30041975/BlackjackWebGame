import { CiUser } from "react-icons/ci";
import '../../styles/Common.css'

function EmailInput({ value, onChange }) {
    return (
        <div className="input-box">
            <input 
                type="email" 
                placeholder="Email"
                value={value}
                onChange={onChange}
                required
            />
            <i className="icon">
                <CiUser />
            </i>
        </div>
    )
}

export default EmailInput;