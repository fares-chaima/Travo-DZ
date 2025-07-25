import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Bell,
  Lock,
  Eye,
  Sun,
  Moon,
  Smartphone,
  Save,
  Home,
  FileText,
  Mail,
  Calendar,
  Settings as SettingsIcon,
  LogOut,
  Search,
  ChevronDown,
  Shield,
  Globe,
  Users
} from 'lucide-react';
import '../styles/SettingsPage.css';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('parametres');
  const [activeSettingsTab, setActiveSettingsTab] = useState('account');
  
  // États pour les paramètres
  const [settings, setSettings] = useState({
    account: {
      email: 'utilisateur@exemple.com',
      phone: '+213 5 55 55 55 55',
      language: 'العربية',
      password: '••••••••'
    },
    notifications: {
      messages: true,
      appointments: true,
      recommendations: false,
      promotions: false
    },
    privacy: {
      profileVisibility: 'public',
      contactVisibility: 'connections',
      activityStatus: true
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium'
    }
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'profile') {
      navigate('/profile');
    } else if (tab === 'accueil') {
      navigate('/home');
    } else if (tab === 'messages') {
      navigate('/msg');
    } else if (tab === 'calendrier') {
      navigate('/cal');
    } else if (tab === 'documents') {
      navigate('/doc');
    } else if (tab === 'parametres') {
      navigate('/settings');
    } else if (tab === 'annonces') {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('الإعدادات المحفوظة:', settings);
    // هنا يمكنك إضافة استدعاء API لحفظ الإعدادات
  };

  return (
    <div className="main-container" dir="rtl">
      {/* Top Navigation - Cohérent avec les autres pages */}
      <nav className="header-bar">
        <div className="header-start">
          <h1 className="logo">كلشي ساهل</h1>
        </div>
        <div className="search-area">
        
          <input
            type="text"
            placeholder="البحث..."
            className="search-bar"
          />
        </div>
        <div className="header-end">
          <button className="alert-button">
            <Bell size={20} />
            <span className="alert-badge">3</span>
          </button>
          <div className="profile-avatar" onClick={() => handleTabChange('profile')}>
            <User size={20} />
          </div>
        </div>
      </nav>

      <div className="content-layout">
        {/* Left Navigation - Identique aux autres pages */}
        <aside className="sidebar-left">
          <div className="side-menu">
            <button className={`menu-option ${activeTab === 'accueil' ? 'active' : ''}`} onClick={() => handleTabChange('accueil')}>
              <Home size={20} /><span>الرئيسية</span>
            </button>
            <button className={`menu-option ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabChange('profile')}>
              <User size={20} /><span>الملف الشخصي</span>
            </button>
            <button className={`menu-option ${activeTab === 'annonces' ? 'active' : ''}`} onClick={() => handleTabChange('annonces')}>
              <FileText size={20} /><span>إعلاناتي</span>
            </button>
            <button className={`menu-option ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => handleTabChange('messages')}>
              <Mail size={20} /><span>الرسائل</span>
            </button>
            <button className={`menu-option ${activeTab === 'calendrier' ? 'active' : ''}`} onClick={() => handleTabChange('calendrier')}>
              <Calendar size={20} /><span>التقويم</span>
            </button>
            <button className={`menu-option ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => handleTabChange('documents')}>
              <FileText size={20} /><span>الوثائق</span>
            </button>
            <button className={`menu-option ${activeTab === 'parametres' ? 'active' : ''}`} onClick={() => handleTabChange('parametres')}>
              <SettingsIcon size={20} /><span>الإعدادات</span>
            </button>
            <button className="menu-option logout-btn" onClick={handleLogout}>
              <LogOut size={20} /><span>تسجيل الخروج</span>
            </button>
          </div>
        </aside>

        {/* Main Content - Adapté pour les paramètres */}
        <div className="core-content">
          <div className="settings-page">
            <div className="settings-header">
              <h2><SettingsIcon size={24} /> الإعدادات</h2>
              <p>خصص تجربتك مع كلشي ساهل</p>
            </div>

            <div className="settings-container">
              <div className="settings-sidebar">
                <button 
                  className={`settings-tab ${activeSettingsTab === 'account' ? 'active' : ''}`}
                  onClick={() => setActiveSettingsTab('account')}
                >
                  <User size={18} /> الحساب
                </button>
                <button 
                  className={`settings-tab ${activeSettingsTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveSettingsTab('notifications')}
                >
                  <Bell size={18} /> الإشعارات
                </button>
                <button 
                  className={`settings-tab ${activeSettingsTab === 'privacy' ? 'active' : ''}`}
                  onClick={() => setActiveSettingsTab('privacy')}
                >
                  <Lock size={18} /> الخصوصية
                </button>
                <button 
                  className={`settings-tab ${activeSettingsTab === 'appearance' ? 'active' : ''}`}
                  onClick={() => setActiveSettingsTab('appearance')}
                >
                  <Eye size={18} /> المظهر
                </button>
              </div>

              <div className="settings-content">
                {activeSettingsTab === 'account' && (
                  <div className="settings-section">
                    <h3><User size={20} /> إعدادات الحساب</h3>
                    <div className="form-group">
                      <label>البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        value={settings.account.email}
                        onChange={(e) => handleSettingChange('account', 'email', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>رقم الهاتف</label>
                      <input 
                        type="tel" 
                        value={settings.account.phone}
                        onChange={(e) => handleSettingChange('account', 'phone', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>اللغة</label>
                      <select 
                        value={settings.account.language}
                        onChange={(e) => handleSettingChange('account', 'language', e.target.value)}
                      >
                        <option value="العربية">العربية</option>
                        <option value="Français">الفرنسية</option>
                        <option value="English">الإنجليزية</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>كلمة المرور</label>
                      <div className="password-field">
                        <input type="password" value={settings.account.password} readOnly />
                        <button className="secondary-btn">تعديل</button>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'notifications' && (
                  <div className="settings-section">
                    <h3><Bell size={20} /> تفضيلات الإشعارات</h3>
                    <div className="toggle-group">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={settings.notifications.messages}
                          onChange={(e) => handleSettingChange('notifications', 'messages', e.target.checked)}
                        />
                        <span>الرسائل الجديدة</span>
                      </label>
                      <label>
                        <input 
                          type="checkbox" 
                          checked={settings.notifications.appointments}
                          onChange={(e) => handleSettingChange('notifications', 'appointments', e.target.checked)}
                        />
                        <span>المواعيد</span>
                      </label>
                      <label>
                        <input 
                          type="checkbox" 
                          checked={settings.notifications.recommendations}
                          onChange={(e) => handleSettingChange('notifications', 'recommendations', e.target.checked)}
                        />
                        <span>التوصيات</span>
                      </label>
                      <label>
                        <input 
                          type="checkbox" 
                          checked={settings.notifications.promotions}
                          onChange={(e) => handleSettingChange('notifications', 'promotions', e.target.checked)}
                        />
                        <span>العروض الترويجية</span>
                      </label>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'privacy' && (
                  <div className="settings-section">
                    <h3><Lock size={20} /> إعدادات الخصوصية</h3>
                    <div className="form-group">
                      <label>رؤية الملف الشخصي</label>
                      <select 
                        value={settings.privacy.profileVisibility}
                        onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                      >
                        <option value="public">عام</option>
                        <option value="connections">للمعارف فقط</option>
                        <option value="private">خاص</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>رؤية معلومات الاتصال</label>
                      <select 
                        value={settings.privacy.contactVisibility}
                        onChange={(e) => handleSettingChange('privacy', 'contactVisibility', e.target.value)}
                      >
                        <option value="public">عام</option>
                        <option value="connections">للمعارف فقط</option>
                        <option value="private">خاص</option>
                      </select>
                    </div>
                    <div className="toggle-group">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={settings.privacy.activityStatus}
                          onChange={(e) => handleSettingChange('privacy', 'activityStatus', e.target.checked)}
                        />
                        <span>إظهار حالة النشاط</span>
                      </label>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'appearance' && (
                  <div className="settings-section">
                    <h3><Eye size={20} /> المظهر</h3>
                    <div className="form-group">
                      <label>الثيم</label>
                      <div className="theme-options">
                        <button 
                          className={`theme-option ${settings.appearance.theme === 'light' ? 'active' : ''}`}
                          onClick={() => handleSettingChange('appearance', 'theme', 'light')}
                        >
                          <Sun size={20} /> فاتح
                        </button>
                        <button 
                          className={`theme-option ${settings.appearance.theme === 'dark' ? 'active' : ''}`}
                          onClick={() => handleSettingChange('appearance', 'theme', 'dark')}
                        >
                          <Moon size={20} /> داكن
                        </button>
                        <button 
                          className={`theme-option ${settings.appearance.theme === 'system' ? 'active' : ''}`}
                          onClick={() => handleSettingChange('appearance', 'theme', 'system')}
                        >
                          <Smartphone size={20} /> النظام
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>حجم الخط</label>
                      <select 
                        value={settings.appearance.fontSize}
                        onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                      >
                        <option value="small">صغير</option>
                        <option value="medium">متوسط</option>
                        <option value="large">كبير</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="settings-footer">
              <button className="primary-btn" onClick={handleSaveSettings}>
                <Save size={18} /> حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;