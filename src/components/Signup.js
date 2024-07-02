// src/components/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import AppleSignin from 'react-apple-signin-auth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [emailExists, setEmailExists] = useState(false);

    const checkEmailExists = async () => {
        const response = await fetch('/api/check-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        setEmailExists(data.exists);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 회원가입 폼 제출 처리 로직
    };

    const handleGoogleLogin = (response) => {
        console.log(response);
    };

    const handleFacebookLogin = (response) => {
        console.log(response);
    };

    const handleAppleLogin = (response) => {
        console.log(response);
    };

    return (
        <div className="signup-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="이름" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="이메일" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="button" onClick={checkEmailExists}>
                    중복체크
                </button>
                {emailExists && <p>이미 존재하는 이메일입니다.</p>}
                <input 
                    type="password" 
                    placeholder="비밀번호" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">회원가입</button>
            </form>
            <div className="oauth-container">
                <h3>다음 계정으로 로그인</h3>
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => { console.log('Google Login Failed'); }}
                />
                <FacebookLogin
                    appId="YOUR_FACEBOOK_APP_ID"
                    callback={handleFacebookLogin}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>Facebook으로 로그인</button>
                    )}
                />
                <AppleSignin
                    authOptions={{
                        clientId: 'YOUR_APPLE_CLIENT_ID',
                        scope: 'email name',
                        redirectURI: 'YOUR_REDIRECT_URI',
                        usePopup: true
                    }}
                    onSuccess={handleAppleLogin}
                    onError={(error) => { console.log('Apple Login Failed:', error); }}
                    render={(props) => (
                        <button onClick={props.onClick}>Apple로 로그인</button>
                    )}
                />
            </div>
            <p>이미 회원이신가요? <Link to="/login">로그인하기</Link></p>
        </div>
    );
};

export default SignUp;