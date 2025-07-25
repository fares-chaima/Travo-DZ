import React from 'react';
import { FaTools, FaSearch, FaHandshake, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import WelcomeHeader from '../Components/WelcomeHeader';
import WelcomeFooter from '../Components/WelcomeFooter';
import '../styles/welcome.css'

const WelcomePage = () => {
  const features = [
    {
      icon: <FaSearch size={40} />,
      title: "ابحث بسهولة",
      description: "ابحث عن حرفيين مؤهلين بالقرب منك"
    },
    {
      icon: <FaTools size={40} />,
      title: "ملفات موثقة",
      description: "وصول إلى محترفين بمهارات معتمدة"
    },
    {
      icon: <FaHandshake size={40} />,
      title: "اتصال مباشر",
      description: "تواصل مباشرة مع الحرفيين"
    },
    {
      icon: <FaStar size={40} />,
      title: "تقييمات حقيقية",
      description: "اطلع على تقييمات العملاء الآخرين"
    }
  ];

  const popularCategories = [
    { name: "كهربائي", icon: "⚡" },
    { name: "سباك", icon: "🚿" },
    { name: "نجار", icon: "🪚" },
    { name: "فني تكييف", icon: "❄️" },
    { name: "بناء", icon: "🧱" },
    { name: "ميكانيكي منزلي", icon: "🔧" },
    { name: "حداد", icon: "🔑" },
    { name: "فني صوتيات ومرئيات", icon: "📺" },
    { name: "فني مصاعد", icon: "🛗" },
    { name: "مكافحة حشرات", icon: "🐜" },
    { name: "عاملة نظافة", icon: "🧹" },
    { name: "مربية أطفال", icon: "👶" },
    { name: "حمال", icon: "🏋️" },
    { name: "بستاني/مهندس حدائق", icon: "🌿" },
    { name: "حلاق رجال", icon: "✂️" },
    { name: "حلاقة نساء", icon: "💇" },
    { name: "معلمين", icon: "📚" },
    { name: "حراس", icon: "🏘️" },
    { name: "سائق شاحنة", icon: "🚚" },
    { name: "سائق سيارة", icon: "🚗" }
  ];

  return (
    <div className="welcome-page" dir="rtl">
      <WelcomeHeader />
      
      {/* قسم البطل */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">تواصل مع حرفي جزائري موثوق لحل مشاكلك بسرعة.</h1>
          <p className="hero-subtitle">اتصل بمحترفين مؤهلين بالقرب منك</p>
          
          <div className="ssearch-box">
            <div className="ssearch-input">
              <FaSearch className="ssearch-icon" />
              <input type="text" placeholder="ما الخدمة التي تبحث عنها؟" />
            </div>
            <div className="location-input">
              <FaMapMarkerAlt className="location-icon" />
              <input type="text" placeholder="أين؟" />
            </div>
            <button className="ssearch-button">بحث</button>
          </div>
        </div>
      </section>

      {/* قسم الميزات */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">لماذا تختار كلشي ساهل؟</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الفئات */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">فئات شائعة</h2>
          <div className="categories-grid">
            {popularCategories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الدعوة للعمل */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">مستعد للبدء؟</h2>
          <div className="cta-buttons">
            <button className="cta-button primary">ابحث عن حرفي</button>
            <button className="cta-button secondary">كن حرفياً</button>
          </div>
        </div>
      </section>

      <WelcomeFooter />
    </div>
  );
};

export default WelcomePage;