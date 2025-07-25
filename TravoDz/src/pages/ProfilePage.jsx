import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home,
  User,
  FileText,
  Mail,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [activeContentTab, setActiveContentTab] = useState('experience');

  // بيانات الملف الشخصي
  const [profile, setProfile] = useState({
    name: 'محمد بن علي',
    title: 'سباك محترف',
    rating: 4.8,
    location: 'الجزائر العاصمة، الجزائر',
    phone: '+213 555 123 456',
    email: 'mohammed.benali@example.com',
    bio: 'سباك ذو خبرة تزيد عن 10 سنوات في المجال. متخصص في التركيبات الحديثة والإصلاحات المعقدة.',
    skills: ['سباكة منزلية', 'تسخين مركزي', 'تركيبات صحية', 'ترميم'],
    profileImage: 'https://www.toma-interim.com/wp-content/uploads/2022/12/Plombier-chauffagiste-4.png'
  });
  
  // وضع التعديل
  const [isEditMode, setIsEditMode] = useState(false);
  
  // مهارة جديدة
  const [newSkill, setNewSkill] = useState('');

  // الخبرات العملية
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      period: 'يناير 2015 - الحاضر',
      title: 'سباك مستقل',
      company: 'عمل حر',
      description: 'إدارة مشاريع السباكة السكنية والتجارية. تركيب وإصلاح أنظمة الصرف الصحي والتدفئة.'
    },
    {
      id: 2,
      period: 'مارس 2015 - ديسمبر 2017',
      title: 'سباك أول',
      company: 'الإنشاءات الحديثة ش.ذ.م.م، الجزائر',
      description: 'مسؤول عن فريق من 3 سباكين في مواقع سكنية وتجارية.'
    },
    {
      id: 3,
      period: 'يونيو 2011 - فبراير 2015',
      title: 'سباك',
      company: 'خدمات البناء المتكامل، وهران',
      description: 'تركيب وصيانة أنظمة السباكة للمشاريع السكنية.'
    }
  ]);

  // الشهادات
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      title: 'شهادة في السباكة المتقدمة',
      issuer: 'المعهد الوطني لحرف الصناعة التقليدية',
      year: '2017',
      pdfLink: '#'
    },
    {
      id: 2,
      title: 'دورة في التدفئة المركزية',
      issuer: 'مركز التكوين المهني',
      year: '2015',
      pdfLink: '#'
    },
    {
      id: 3,
      title: 'دبلوم سباك محترف',
      issuer: 'مدرسة مهن البناء',
      year: '2011',
      pdfLink: '#'
    }
  ]);

  // المشاريع/المعرض
  const [projects] = useState([
    {
      id: 1,
      title: 'ترميم حمام',
      location: 'وسط الجزائر',
      date: 'مارس 2023',
      description: 'ترميم كامل لحمام مع تركيب دش حديث.',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCNRBZU93kQb9HWPnq14vv9lxnsqYexgejQ&s',
        'https://cdn.prod.website-files.com/65bab1f245c8cb21903cd546/65bab1f245c8cb21903cdabc_aeca54bd-6dea-4db6-a287-8190ca563268_rm-fanca-bathroom3.jpeg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM_7UJY3QlfC0c55SS0v7F0zySY12pkVxn-Q&s'
      ]
    },
    {
      id: 2,
      title: 'تركيب تدفئة مركزية',
      location: 'وهران',
      date: 'نوفمبر 2022',
      description: 'تركيب نظام تدفئة مركزية في فيلا مساحتها 180م².',
      images: [
        'https://www.expertise-renovation.com/wp-content/uploads/sites/15/2021/11/chauffe-eau-715x1024.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmNa1BKrSv_xV9KsAp9ISfXS5C_5PsOfyma0ZXje5CBIEsOTYVLjUtTSsrV8NuHfrVo9Q&usqp=CAU'
      ]
    },
    {
      id: 3,
      title: 'إصلاح طارئ',
      location: 'قسنطينة',
      date: 'يونيو 2022',
      description: 'تدخل عاجل لإصلاح تسرب رئيسي في عمارة.',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLXZLzS5tGjnUrYX8RpmTwdgkDvwiQB5FYA&s']
    }
  ]);

  // الإعلانات
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'متاح لترميم الحمامات',
      description: 'أقدم خدماتي لترميم حمامك بالكامل. تقديم عرض مجاني.',
      date: '15/04/2023',
      status: 'active'
    },
    {
      id: 2,
      title: 'عرض خاص على التركيبات الصحية',
      description: 'خصم 20% على تركيب الأدوات الصحية الجديدة حتى 30 يونيو.',
      date: '01/04/2023',
      status: 'active'
    }
  ]);

  // الفيديوهات
  const [videos] = useState([
    {
      id: 1,
      title: 'كيفية إصلاح صنبور يتسرب',
      thumbnail: 'https://youtu.be/WfVYUNeOl6Q?t=2',
      videoUrl: 'https://youtu.be/WfVYUNeOl6Q?t=2'
    },
    {
      id: 2,
      title: 'تركيب سخان ماء',
      thumbnail: 'https://youtu.be/wIrWfX7r1Gs',
      videoUrl: 'https://youtu.be/wIrWfX7r1Gs'
    }
  ]);

  const fileInputRef = useRef(null);

  // التنقل
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'profile') {
      navigate('/profile');
    } else if (tab === 'home') {
      navigate('/home');
    } else if (tab === 'messages') {
      navigate('/msg');
    } else if (tab === 'calendar') {
      navigate('/cal');
    } else if (tab === 'documents') {
      navigate('/doc');
    } else if (tab === 'settings') {
      navigate('/settings');
    }
    else if (tab === 'announcements') {
      navigate('/dashboard');}
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // تعديل الملف الشخصي
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, profileImage: e.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  // إضافة مهارة
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() !== '') {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };
  
  // حذف مهارة
  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };
  
  // تغيير التقييم
  const handleRatingChange = (newRating) => {
    setProfile(prev => ({
      ...prev,
      rating: newRating
    }));
  };

  // إعلان جديد
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    description: ''
  });

  const handleAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({ ...prev, [name]: value }));
  };

  const addAnnouncement = (e) => {
    e.preventDefault();
    if (newAnnouncement.title && newAnnouncement.description) {
      const today = new Date();
      const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
      
      setAnnouncements(prev => [
        ...prev,
        {
          id: Date.now(),
          ...newAnnouncement,
          date,
          status: 'active'
        }
      ]);
      
      setNewAnnouncement({ title: '', description: '' });
    }
  };

  // حذف إعلان
  const deleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="main-container" dir="rtl">
      {/* شريط التنقل العلوي */}
      <nav className="header-bar">
        <div className="header-start">
          <h1 className="logo">كلشي ساهل</h1>
        </div>
        <div className="search-area">
          <input
            type="text"
            placeholder="بحث..."
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
        {/* القائمة الجانبية اليسرى */}
        <aside className="sidebar-left">
          <div className="side-menu">
            <button
              className={`menu-option ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleTabChange('home')}
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
              className={`menu-option ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => handleTabChange('announcements')}
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
              className={`menu-option ${activeTab === 'calendar' ? 'active' : ''}`}
              onClick={() => handleTabChange('calendar')}
            >
              <Calendar size={20} />
              <span>المواعيد</span>
            </button>
            <button
              className={`menu-option ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => handleTabChange('documents')}
            >
              <FileText size={20} />
              <span>المستندات</span>
            </button>
            <button
              className={`menu-option ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => handleTabChange('settings')}
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

        {/* المحتوى الرئيسي */}
        <div className="core-content">
          <div className="user-container">
            <div className="action-buttons">
              <button 
                className={`modify-profile-btn ${isEditMode ? 'active' : ''}`} 
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? 'إنهاء التعديل' : 'تعديل الملف'}
              </button>
              {isEditMode && (
                <button className="store-changes-btn">
                  حفظ التغييرات
                </button>
              )}
            </div>
            
            <div className="user-banner">
              <div className="banner-content">
                <div className="avatar-box" onClick={handleImageClick}>
                  <img src={profile.profileImage} alt={profile.name} className="user-picture" />
                  <div className="avatar-overlay">
                    <span>تغيير</span>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                </div>
                
                <div className="user-details">
                  <div className="editable-user-info">
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="name-field"
                      disabled={!isEditMode}
                    />
                    <div className="rating-display">
                      {isEditMode ? (
                        <div className="rating-modifier">
                          {[1, 2, 3, 4, 5].map(star => (
                            <span 
                              key={star} 
                              className={`rating-star ${star <= profile.rating ? 'active' : ''}`}
                              onClick={() => handleRatingChange(star)}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="rating-symbols">{'★'.repeat(Math.floor(profile.rating))}{'☆'.repeat(5 - Math.floor(profile.rating))}</span>
                      )}
                      <span className="score-label">{profile.rating}/5</span>
                    </div>
                    <input
                      type="text"
                      name="title"
                      value={profile.title}
                      onChange={handleProfileChange}
                      className="title-field"
                      disabled={!isEditMode}
                    />
                    <div className="contact-info">
                      <div className="info-item">
                        <span className="info-icon">📍</span>
                        <input
                          type="text"
                          name="location"
                          value={profile.location}
                          onChange={handleProfileChange}
                          className="info-field"
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="info-item">
                        <span className="info-icon">📱</span>
                        <input
                          type="text"
                          name="phone"
                          value={profile.phone}
                          onChange={handleProfileChange}
                          className="info-field"
                          disabled={!isEditMode}
                        />
                      </div>
                      <div className="info-item">
                        <span className="info-icon">✉️</span>
                        <input
                          type="text"
                          name="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                          className="info-field"
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bio-section">
              <h3>معلومات عني</h3>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                className="bio-text"
                disabled={!isEditMode}
              ></textarea>
            </div>
            
            <div className="skills-section">
              <div className="skills-title-bar">
                <h3>المهارات</h3>
                {isEditMode && (
                  <form onSubmit={handleAddSkill} className="new-skill-form">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="مهارة جديدة"
                      className="skill-input"
                    />
                    <button type="submit" className="skill-add-btn">إضافة</button>
                  </form>
                )}
              </div>
              <div className="skill-collection">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="skill-wrapper">
                    <span className="skill-label">{skill}</span>
                    {isEditMode && (
                      <button 
                        className="delete-skill-btn"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="content-tabs">
              <div className="tab-nav">
                <button 
                  className={activeContentTab === 'experience' ? 'active' : ''} 
                  onClick={() => setActiveContentTab('experience')}
                >
                  الخبرات
                </button>
                <button 
                  className={activeContentTab === 'certifications' ? 'active' : ''} 
                  onClick={() => setActiveContentTab('certifications')}
                >
                  الشهادات
                </button>
                <button 
                  className={activeContentTab === 'gallery' ? 'active' : ''} 
                  onClick={() => setActiveContentTab('gallery')}
                >
                  معرض الأعمال
                </button>
                <button 
                  className={activeContentTab === 'videos' ? 'active' : ''} 
                  onClick={() => setActiveContentTab('videos')}
                >
                  الفيديوهات
                </button>
                <button 
                  className={activeContentTab === 'announcements' ? 'active' : ''} 
                  onClick={() => setActiveContentTab('announcements')}
                >
                  الإعلانات
                </button>
              </div>
              
              <div className="tab-content">
                {activeContentTab === 'experience' && (
                  <div className="work-history">
                    {isEditMode && (
                      <div className="new-experience">
                        <h4>إضافة خبرة جديدة</h4>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.target);
                          const newExp = {
                            id: Date.now(),
                            period: formData.get('period'),
                            title: formData.get('title'),
                            company: formData.get('company'),
                            description: formData.get('description'),
                          };
                          
                          setExperiences(prev => [...prev, newExp]);
                          e.target.reset();
                        }}>
                          <div className="input-section">
                            <label>الفترة</label>
                            <input type="text" name="period" placeholder="مثال: يناير 2020 - الحاضر" required />
                          </div>
                          <div className="input-section">
                            <label>المسمى الوظيفي</label>
                            <input type="text" name="title" placeholder="مثال: سباك أول" required />
                          </div>
                          <div className="input-section">
                            <label>الشركة</label>
                            <input type="text" name="company" placeholder="مثال: شركة XYZ، الجزائر" required />
                          </div>
                          <div className="input-section">
                            <label>الوصف</label>
                            <textarea name="description" placeholder="صف مسؤولياتك..." required></textarea>
                          </div>
                          <button type="submit" className="submit-button">إضافة الخبرة</button>
                        </form>
                      </div>
                    )}
                    
                    {experiences.map((exp) => (
                      <div key={exp.id} className="history-entry">
                        <div className="history-dot"></div>
                        <div className="history-details">
                          {isEditMode && (
                            <button 
                              className="delete-button remove-history-btn"
                              onClick={() => setExperiences(prev => prev.filter(e => e.id !== exp.id))}
                            >
                              ×
                            </button>
                          )}
                          
                          {isEditMode ? (
                            <div className="history-edit">
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) => {
                                  setExperiences(prev => 
                                    prev.map(item => item.id === exp.id ? {...item, period: e.target.value} : item)
                                  );
                                }}
                                className="history-timeframe-input"
                              />
                              <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => {
                                  setExperiences(prev => 
                                    prev.map(item => item.id === exp.id ? {...item, title: e.target.value} : item)
                                  );
                                }}
                                className="history-title-input"
                              />
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                  setExperiences(prev => 
                                    prev.map(item => item.id === exp.id ? {...item, company: e.target.value} : item)
                                  );
                                }}
                                className="history-employer-input"
                              />
                              <textarea
                                value={exp.description}
                                onChange={(e) => {
                                  setExperiences(prev => 
                                    prev.map(item => item.id === exp.id ? {...item, description: e.target.value} : item)
                                  );
                                }}
                                className="history-summary-input"
                              ></textarea>
                            </div>
                          ) : (
                            <>
                              <div className="history-timeframe">{exp.period}</div>
                              <h4 className="history-title">{exp.title}</h4>
                              <div className="history-employer">{exp.company}</div>
                              <p className="history-summary">{exp.description}</p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeContentTab === 'certifications' && (
                  <div className="cert-list">
                    {isEditMode && (
                      <div className="add-certification">
                        <h4>إضافة شهادة جديدة</h4>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.target);
                          const newCert = {
                            id: Date.now(),
                            title: formData.get('title'),
                            issuer: formData.get('issuer'),
                            year: formData.get('year'),
                            pdfLink: '#',
                          };
                          
                          setCertifications(prev => [...prev, newCert]);
                          e.target.reset();
                        }}>
                          <div className="input-section">
                            <label>عنوان الشهادة</label>
                            <input type="text" name="title" placeholder="مثال: شهادة في السباكة المتقدمة" required />
                          </div>
                          <div className="input-section">
                            <label>جهة الإصدار</label>
                            <input type="text" name="issuer" placeholder="مثال: المعهد الوطني لحرف الصناعة التقليدية" required />
                          </div>
                          <div className="input-section">
                            <label>سنة الحصول</label>
                            <input type="text" name="year" placeholder="مثال: 2020" required />
                          </div>
                          <div className="input-section">
                            <label>ملف PDF</label>
                            <input type="file" name="pdf" accept=".pdf" />
                          </div>
                          <button type="submit" className="submit-button">إضافة الشهادة</button>
                        </form>
                      </div>
                    )}
                    
                    {certifications.map((cert) => (
                      <div key={cert.id} className="cert-card">
                        <div className="cert-details">
                          {isEditMode && (
                            <button 
                              className="delete-button remove-cert-btn"
                              onClick={() => setCertifications(prev => prev.filter(c => c.id !== cert.id))}
                            >
                              ×
                            </button>
                          )}
                          
                          {isEditMode ? (
                            <div className="cert-edit">
                              <input
                                type="text"
                                value={cert.title}
                                onChange={(e) => {
                                  setCertifications(prev => 
                                    prev.map(item => item.id === cert.id ? {...item, title: e.target.value} : item)
                                  );
                                }}
                                className="cert-title-input"
                              />
                              <div className="cert-meta">
                                <input
                                  type="text"
                                  value={cert.issuer}
                                  onChange={(e) => {
                                    setCertifications(prev => 
                                      prev.map(item => item.id === cert.id ? {...item, issuer: e.target.value} : item)
                                    );
                                  }}
                                  className="cert-issuer-input"
                                />
                                <input
                                  type="text"
                                  value={cert.year}
                                  onChange={(e) => {
                                    setCertifications(prev => 
                                      prev.map(item => item.id === cert.id ? {...item, year: e.target.value} : item)
                                    );
                                  }}
                                  className="cert-year-input"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <h4>{cert.title}</h4>
                              <div className="cert-meta">
                                <span className="certification-issuer">{cert.issuer}</span>
                                <span className="certification-year">{cert.year}</span>
                              </div>
                            </>
                          )}
                        </div>
                        <a href={cert.pdfLink} className="cert-download-link" download>
                          <span className="pdf-icon">📄</span> PDF
                        </a>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeContentTab === 'gallery' && (
                  <div className="project-showcase">
                    {projects.map((project) => (
                      <div key={project.id} className="project-card">
                        <h4 className="project-heading">{project.title}</h4>
                        <div className="project-info">
                          <span className="project-location">{project.location}</span>
                          <span className="project-date">{project.date}</span>
                        </div>
                        <p className="project-text">{project.description}</p>
                        <div className="project-gallery">
                          {project.images.map((img, index) => (
                            <div key={index} className="image-wrapper">
                              <img src={img} alt={`${project.title} ${index + 1}`} className="gallery-image" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeContentTab === 'videos' && (
                  <div className="video-collection">
                    {videos.map((video) => (
                      <div key={video.id} className="video-card">
                        <div className="video-preview-box">
                          <img src={video.thumbnail} alt={video.title} className="video-preview" />
                          <div className="play-icon">▶</div>
                        </div>
                        <h4 className="video-heading">{video.title}</h4>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeContentTab === 'announcements' && (
                  <div className="announce-area">
                    <div className="create-announce">
                      <h4>إعلان جديد</h4>
                      <form onSubmit={addAnnouncement}>
                        <div className="input-section">
                          <label>العنوان</label>
                          <input
                            type="text"
                            name="title"
                            value={newAnnouncement.title}
                            onChange={handleAnnouncementChange}
                            required
                          />
                        </div>
                        <div className="input-section">
                          <label>الوصف</label>
                          <textarea
                            name="description"
                            value={newAnnouncement.description}
                            onChange={handleAnnouncementChange}
                            required
                          ></textarea>
                        </div>
                        <button type="submit" className="submit-button">نشر الإعلان</button>
                      </form>
                    </div>
                    
                    <div className="announce-list">
                      <h4>إعلاناتي</h4>
                      {announcements.map((announcement) => (
                        <div key={announcement.id} className="announce-card">
                          <div className="announce-title-bar">
                            <h5 className="announce-heading">{announcement.title}</h5>
                            <div className="announce-controls">
                              <span className={`announce-status ${announcement.status}`}>
                                {announcement.status === 'active' ? 'نشط' : 'غير نشط'}
                              </span>
                              <button 
                                className="delete-button" 
                                onClick={() => deleteAnnouncement(announcement.id)}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                          <p className="announce-text">{announcement.description}</p>
                          <div className="announce-date">تاريخ النشر: {announcement.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* الشريط الجانبي الأيمن */}
        <aside className="sidebar-right">
          <div className="sidebar-top">
            <div className="sidebar-block">
              <h3>الإحصائيات</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">24</div>
                  <div className="stat-label">مشروع منجز</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">4.8</div>
                  <div className="stat-label">متوسط التقييم</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">18</div>
                  <div className="stat-label">عميل راضٍ</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">3</div>
                  <div className="stat-label">سنوات خبرة</div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-bottom">
            <div className="sidebar-block support-section">
              <h3>حسّن ملفك الشخصي</h3>
              <p>أضف المزيد من التفاصيل والصور لجذب المزيد من العملاء.</p>
              <button className="help-btn">
                <HelpCircle size={18} /> نصائح
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;