import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCheck } from 'react-icons/fa';
import '../styles/RegisterPage.css';
import e from '../assets/d.png'

const RegisterPage = () => {
  return (
    <div className="signup-page" dir="rtl">
      <div className="signup-wrapper">
        <div className="signup-banner">
          <div className="logo-section">
            <img src={e} alt="شعار كلشي ساهل" className="signup-logo" />
            <h1>كلشي <span>ساهل</span></h1>
          </div>
          <h2>تسجيل جديد</h2>
          <p className="signup-subtext">انضم إلى أول منصة للحرفيين في الجزائر</p>
        </div>
        
        <form className="signup-form">
          <div className="form-layout">
            <div className="form-field">
              <label htmlFor="firstName">الاسم</label>
              <div className="input-wrapper">
                <span className="input-symbol"><FaUser /></span>
                <input 
                  id="firstName" 
                  type="text" 
                  placeholder="اسمك الأول" 
                  required 
                  className="form-field-input"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="lastName">اللقب</label>
              <div className="input-wrapper">
                <span className="input-symbol"><FaUser /></span>
                <input 
                  id="lastName" 
                  type="text" 
                  placeholder="اسم العائلة" 
                  required 
                  className="form-field-input"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="email">البريد الإلكتروني</label>
              <div className="input-wrapper">
                <span className="input-symbol"><FaEnvelope /></span>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="example@email.com" 
                  required 
                  className="form-field-input"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="phone">الهاتف</label>
              <div className="input-wrapper">
                <span className="input-symbol"><FaPhone /></span>
                <input 
                  id="phone" 
                  type="tel" 
                  placeholder="05 XX XX XX XX" 
                  required 
                  className="form-field-input"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="password">كلمة المرور</label>
              <div className="input-wrapper">
                <span className="input-symbol"><FaLock /></span>
                <input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="form-field-input"
                />
              </div>
              <div className="password-meter">
                <div className="meter-bar"></div>
                <span>قوة كلمة المرور</span>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
              <div className="input-wrapper">
                <span className="input-symbol"><FaLock /></span>
                <input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="form-field-input"
                />
              </div>
            </div>
          </div>

          <div className="role-selection">
            <h3>نوع الحساب</h3>
            <div className="role-options">
              <label className="role-choice">
                <input 
                  type="radio" 
                  name="accountType" 
                  value="client" 
                  defaultChecked 
                  className="role-input"
                />
                <div className="role-details">
                  <div className="role-icon client-icon"></div>
                  <span>عميل</span>
                  <p>أبحث عن حرفي</p>
                </div>
              </label>
              
              <label className="role-choice">
                <input 
                  type="radio" 
                  name="accountType" 
                  value="artisan" 
                  className="role-input"
                />
                <div className="role-details">
                  <div className="role-icon artisan-icon"></div>
                  <span>حرفي</span>
                  <p>أقدم خدماتي</p>
                </div>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <label className="terms-acceptance">
              <input type="checkbox" required className="terms-input" />
              <span className="terms-checkmark"><FaCheck /></span>
              <span>أوافق على <Link to="/terms">الشروط والأحكام</Link> و <Link to="/privacy">سياسة الخصوصية</Link></span>
            </label>

            <button type="submit" className="signup-submit">
              إنشاء حساب
            </button>

            <div className="login-prompt">
              <span>لديك حساب بالفعل؟</span>
              <Link to="/login" className="login-action">تسجيل الدخول</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;