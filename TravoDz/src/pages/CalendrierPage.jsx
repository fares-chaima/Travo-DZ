import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  X, 
  User, 
  HardHat,
  Home,
  FileText,
  Mail,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import '../styles/CalendrierPage.css';

const CalendrierPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calendrier');
  const [viewMode, setViewMode] = useState('client'); // 'client' أو 'artisan'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Données de démonstration
  const [availability, setAvailability] = useState({
    workingHours: { start: '08:00', end: '17:00' },
    availableDates: {}
  });

  // Constantes
  const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  // Fonctions utilitaires
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  // Gestion de la navigation
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

  // Générer le calendrier
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day);
          day++;
        }
      }
      calendar.push(week);
      if (day > daysInMonth) break;
    }

    return calendar;
  };

  // Navigation dans le calendrier
  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(direction === 'prev' ? prev.getMonth() - 1 : prev.getMonth() + 1);
      return newDate;
    });
  };

  // Vérifier la disponibilité d'une date
  const isDateAvailable = (day) => {
    const dateStr = formatDateKey(day);
    return availability.availableDates[dateStr];
  };

  // Formater la clé de date
  const formatDateKey = (day) => {
    return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
  };

  // Gestion des sélections
  const handleDateSelect = (day) => {
    if (!day) return;
    
    const dateStr = formatDateKey(day);
    
    if (viewMode === 'artisan') {
      // Artisan : bascule la disponibilité
      setAvailability(prev => ({
        ...prev,
        availableDates: {
          ...prev.availableDates,
          [dateStr]: !prev.availableDates[dateStr]
        }
      }));
    } else {
      // Client : sélectionne la date
      if (isDateAvailable(day)) {
        setSelectedDate(dateStr);
        setSelectedTime(null);
      }
    }
  };

  // Générer les créneaux horaires
  const generateTimeSlots = () => {
    const slots = [];
    const [startHour, startMin] = availability.workingHours.start.split(':').map(Number);
    const [endHour, endMin] = availability.workingHours.end.split(':').map(Number);
    
    let hour = startHour;
    let min = startMin;
    
    while (hour < endHour || (hour === endHour && min < endMin)) {
      slots.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
      min += 30;
      if (min >= 60) {
        hour++;
        min = 0;
      }
    }
    
    return slots;
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      showNotification('يرجى اختيار تاريخ وساعة', 'error');
      return;
    }

    // Simuler l'envoi des données
    console.log('تم إنشاء موعد:', {
      date: selectedDate,
      time: selectedTime,
      ...appointmentForm
    });

    showNotification('تم تأكيد الموعد بنجاح!', 'success');
    resetForm();
  };

  // Sauvegarder les disponibilités
  const saveAvailability = () => {
    console.log('تم حفظ التوافر:', availability);
    showNotification('تم تحديث التوافر!', 'success');
  };

  // Affichage des notifications
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Réinitialisation du formulaire
  const resetForm = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setAppointmentForm({
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
  };

  // Effet pour charger des données de démonstration
  useEffect(() => {
    // Simuler des dates disponibles
    const demoDates = {};
    const today = new Date();
    
    for (let i = 1; i <= 31; i++) {
      if (i % 2 === 0) { // Un jour sur deux disponible
        demoDates[`${today.getFullYear()}-${today.getMonth() + 1}-${i}`] = true;
      }
    }
    
    setAvailability(prev => ({
      ...prev,
      availableDates: demoDates
    }));
  }, []);

  return (
    <div className="main-container" dir="rtl">
      {/* Top Navigation */}
      <nav className="header-bar">
        <div className="header-start">
          <h1 className="logo">كلشي ساهل</h1>
        </div>
        <div className="search-area">
          <input
            type="text"
            placeholder="البحث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        {/* Left Navigation */}
        <aside className="sidebar-left">
          <div className="side-menu">
            <button
              className={`menu-option ${activeTab === 'accueil' ? 'active' : ''}`}
              onClick={() => handleTabChange('accueil')}
            >
              <Home size={20} />
              <span>الرئيسية</span>
            </button>
            <button
              className={`menu-option ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              <User size={20} />
              <span>الملف الشخصي</span>
            </button>
            <button
              className={`menu-option ${activeTab === 'annonces' ? 'active' : ''}`}
              onClick={() => handleTabChange('annonces')}
            >
              <FileText size={20} />
              <span>إعلاناتي</span>
            </button>
            <button
              className={`menu-option ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => handleTabChange('messages')}
            >
              <Mail size={20} />
              <span>الرسائل</span>
            </button>
            <button
              className={`menu-option ${activeTab === 'calendrier' ? 'active' : ''}`}
              onClick={() => handleTabChange('calendrier')}
            >
              <Calendar size={20} />
              <span>التقويم</span>
            </button>
            <button
              className={`menu-option ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => handleTabChange('documents')}
            >
              <FileText size={20} />
              <span>الوثائق</span>
            </button>
            <button
              className={`menu-option ${activeTab === 'parametres' ? 'active' : ''}`}
              onClick={() => handleTabChange('parametres')}
            >
              <Settings size={20} />
              <span>الإعدادات</span>
            </button>
            <button
              className="menu-option logout-btn"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="core-content">
          <div className="calendar-page">
            <div className="mode-toggle">
              <button
                className={`toggle-btn ${viewMode === 'client' ? 'active' : ''}`}
                onClick={() => setViewMode('client')}
              >
                <User size={16} /> عميل
              </button>
              <button
                className={`toggle-btn ${viewMode === 'artisan' ? 'active' : ''}`}
                onClick={() => setViewMode('artisan')}
              >
                <HardHat size={16} /> حرفي
              </button>
            </div>

            <div className="calendar-container">
              <div className="calendar-header">
                <h2>
                  <Calendar size={20} />
                  {viewMode === 'artisan' ? 'إدارة التوافر' : 'حجز موعد'}
                </h2>
                
                <div className="month-navigation">
                  <button onClick={() => navigateMonth('prev')}>&gt;</button>
                  <span>{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                  <button onClick={() => navigateMonth('next')}>&lt;</button>
                </div>
              </div>

              <div className="calendar-grid">
                <div className="weekdays">
                  {DAYS.map(day => (
                    <div key={day} className="weekday">{day}</div>
                  ))}
                </div>

                <div className="days-grid">
                  {generateCalendar().map((week, i) => (
                    <div key={i} className="week-row">
                      {week.map((day, j) => (
                        <div
                          key={j}
                          className={`day-cell ${day ? '' : 'empty'} ${
                            day && isDateAvailable(day) ? 'available' : ''
                          } ${
                            day && selectedDate === formatDateKey(day) ? 'selected' : ''
                          }`}
                          onClick={() => handleDateSelect(day)}
                        >
                          {day && (
                            <>
                              <span>{day}</span>
                              {isDateAvailable(day) && <div className="availability-dot" />}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="details-panel">
                {viewMode === 'artisan' ? (
                  <div className="availability-settings">
                    <h3>إعدادات التوافر</h3>
                    
                    <div className="time-range">
                      <label>
                        ساعة الافتتاح:
                        <input
                          type="time"
                          value={availability.workingHours.start}
                          onChange={(e) => setAvailability(prev => ({
                            ...prev,
                            workingHours: { ...prev.workingHours, start: e.target.value }
                          }))}
                        />
                      </label>
                      
                      <label>
                        ساعة الإغلاق:
                        <input
                          type="time"
                          value={availability.workingHours.end}
                          onChange={(e) => setAvailability(prev => ({
                            ...prev,
                            workingHours: { ...prev.workingHours, end: e.target.value }
                          }))}
                        />
                      </label>
                    </div>

                    <div className="instructions">
                      <p><strong>التعليمات:</strong></p>
                      <ul>
                        <li>انقر على التواريخ لتحديدها كمتوفرة/غير متوفرة</li>
                        <li>حدد ساعات العمل الخاصة بك</li>
                        <li>احفظ التغييرات</li>
                      </ul>
                    </div>

                    <button className="save-btn" onClick={saveAvailability}>
                      <CheckCircle size={16} /> حفظ
                    </button>
                  </div>
                ) : (
                  <div className="appointment-form">
                    {selectedDate ? (
                      <>
                        <h3>موعد يوم {selectedDate.split('-').reverse().join('/')}</h3>
                        
                        {!selectedTime ? (
                          <div className="time-selection">
                            <h4><Clock size={16} /> اختر وقتًا:</h4>
                            <div className="time-slots">
                              {generateTimeSlots().map(time => (
                                <button
                                  key={time}
                                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                  onClick={() => setSelectedTime(time)}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <form onSubmit={handleSubmit}>
                            <h4>المعلومات الشخصية</h4>
                            
                            <div className="form-group">
                              <label>الاسم الكامل</label>
                              <input
                                type="text"
                                value={appointmentForm.name}
                                onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                                required
                              />
                            </div>
                            
                            <div className="form-group">
                              <label>البريد الإلكتروني</label>
                              <input
                                type="email"
                                value={appointmentForm.email}
                                onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                                required
                              />
                            </div>
                            
                            <div className="form-group">
                              <label>الهاتف</label>
                              <input
                                type="tel"
                                value={appointmentForm.phone}
                                onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                                required
                              />
                            </div>
                            
                            <div className="form-group">
                              <label>ملاحظات إضافية</label>
                              <textarea
                                value={appointmentForm.notes}
                                onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                                rows="3"
                              />
                            </div>
                            
                            <button type="submit" className="submit-btn">
                              <CheckCircle size={16} /> تأكيد الموعد
                            </button>
                          </form>
                        )}
                      </>
                    ) : (
                      <div className="selection-prompt">
                        <h4>كيفية حجز موعد:</h4>
                        <ol>
                          <li>اختر تاريخًا متاحًا (باللون الأخضر)</li>
                          <li>اختر وقتًا</li>
                          <li>أدخل معلوماتك</li>
                          <li>أكد طلبك</li>
                        </ol>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {notification && (
              <div className={`notification ${notification.type}`}>
                <p>{notification.message}</p>
                <button onClick={() => setNotification(null)}>
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <aside className="sidebar-right">
          <div className="sidebar-top">
            <div className="sidebar-block">
              <h3>المواعيد القادمة</h3>
              <div className="upcoming-appointments">
                <div className="appointment-card">
                  <div className="appointment-date">
                    <span className="day">15</span>
                    <span className="month">أكتوبر</span>
                  </div>
                  <div className="appointment-info">
                    <h4>سباكة - الحمام</h4>
                    <p>14:30 - 15:30</p>
                    <p className="artisan">مع محمد سعيدي</p>
                  </div>
                </div>
                <div className="appointment-card">
                  <div className="appointment-date">
                    <span className="day">18</span>
                    <span className="month">أكتوبر</span>
                  </div>
                  <div className="appointment-info">
                    <h4>تركيب كهربائي</h4>
                    <p>10:00 - 12:00</p>
                    <p className="artisan">مع كريم حاج</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-bottom">
            <div className="sidebar-block support-section">
              <h3>هل تحتاج إلى مساعدة؟</h3>
              <p>يمكن لمساعدنا مساعدتك في إدارة مواعيدك.</p>
              <button className="help-btn">
                <HelpCircle size={18} /> الدعم
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CalendrierPage;