import React from 'react';

const WelcomeFooter = () => {
  return (
    <footer className="welcome-footer" dir="rtl">
      <div className="container">
        <div className="footer-content" style={{
          flexDirection: 'row-reverse',
          textAlign: 'right'
        }}>
          <div className="footer-about">
            <div className="footer-logo">
              <span className="logo-primary">كلشي</span>
              <span className="logo-dz">ساهل</span>
            </div>
            <p className="footer-description">
              المنصة التي تربط العملاء مع أفضل الحرفيين في الجزائر.
            </p>
          </div>
          
          <div className="footer-links">
            <h3 className="footer-title">روابط سريعة</h3>
            <ul style={{ paddingRight: 0 }}>
              <li><a href="/">الرئيسية</a></li>
              <li><a href="/about">من نحن</a></li>
              <li><a href="/contact">اتصل بنا</a></li>
              <li><a href="/faq">الأسئلة الشائعة</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3 className="footer-title">اتصل بنا</h3>
            <p>elhassarabir@gmail.com</p>
            <p>+213 559 81 76 99</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2015 كلشي ساهل. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default WelcomeFooter;