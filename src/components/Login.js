import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, rememberMe }),
        });

        const data = await response.json();
        if (data.success) {
            navigate('/main');
        } else {
            alert('아이디/비밀번호가 틀렸습니다.');
        }
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">로그인</button>
            </form>
            <div className="link-container">
                <p><Link to="/forgot-password">비밀번호를 잊어버렸나요?</Link></p>
                <p>계정이 없으신가요? <Link to="/signup">회원가입하기</Link></p>
            </div>
        </div>
    );
};

export default Login;