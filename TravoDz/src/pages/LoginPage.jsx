import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
import '../styles/LoginPage.css';
import e from '../assets/d.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // محاكاة تسجيل دخول ناجح
    localStorage.setItem('user', JSON.stringify({
      type: 'client', // أو 'artisan' حسب الحالة
      email: email,
      name: 'مستخدم تجريبي'
    }));

    navigate('/home');
  };

  return (
    <div className="llogin-page" dir="rtl">
      <div className="llogin-container">
        <div className="llogin-header">
          <div className="llogo-wrapper">
            <img src={e} alt="شعار TravoDZ" className="llogin-logo" />
            <h1>كلشي <span>ساهل</span></h1>
          </div>
          <h2>تسجيل الدخول إلى حسابك</h2>
          <p className="llogin-subtitle">ادخل إلى حسابك الشخصي</p>
        </div>

        <form className="llogin-form" onSubmit={handleSubmit}>
          <div className="fform-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <div className="input-groupp">
              <span className="input-iconn"><FaEnvelope /></span>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-groupp">
            <label htmlFor="password">كلمة المرور</label>
            <div className="input-groupp">
              <span className="input-iconn"><FaLock /></span>
              <input
                id="password"
                type="password"
                required
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" id="remember" />
              <span className="checkmark"><FaCheck /></span>
              <span>تذكرني</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">نسيت كلمة المرور؟</Link>
          </div>

          <button type="submit" className="llogin-button">
            تسجيل الدخول
          </button>

          <div className="llogin-footer">
            <span> لا تملك حساب ؟</span>
            <Link to="/register" className="login-link">سجل حساب جديد</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
