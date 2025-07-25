import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Bell,
  PlusCircle,
  Briefcase,
  FileText,
  Clock,
  Activity,
  Filter,
  Search,
  ChevronDown,
  Users,
  User
} from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('candidatures');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('الكل');
  const navigate = useNavigate();

  const toggleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilterStatus('الكل');
    setSearchTerm('');
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setFilterMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const applications = [
    {
      id: 1,
      title: "سباكة",
      name: "أحمد بن علي",
      time: "منذ ساعتين",
      location: "الجزائر، الجزائر",
      status: "في الانتظار",
      urgent: true,
      description: "أبحث عن سباك لإصلاح تسرب في حمامي بالجزائر. التوفر المطلوب: نهاية الأسبوع. الميزانية: 5000 دج.",
      applications: 2,
      comments: 3
    },
    {
      id: 2,
      title: "دهان",
      name: "فاطمة الزهراء",
      time: "منذ يوم",
      location: "قسنطينة، الجزائر",
      status: "مقبولة",
      urgent: false,
      description: "أبحث عن دهان لتجديد شقة مكونة من 3 غرف في قسنطينة. العمل مطلوب خلال أسبوعين. تواصلوا معي لمزيد من التفاصيل.",
      applications: 4,
      comments: 5
    },
    {
      id: 3,
      title: "تركيب كهربائي",
      name: "كريم حاج",
      time: "منذ 3 أيام",
      location: "وهران، الجزائر",
      status: "جارٍ",
      urgent: true,
      description: "بحاجة إلى كهربائي مؤهل لتركيب نظام كهربائي كامل في بناء جديد. المشروع يبدأ الأسبوع القادم.",
      applications: 7,
      comments: 2
    }
  ];

  const myListings = [
    {
      id: 101,
      title: "تجديد مطبخ",
      description: "أقدم خدماتي لتجديد المطابخ بشكل كامل، بما في ذلك تركيب الأثاث، السباكة، والكهرباء.",
      location: "الجزائر، الجزائر",
      publishedDate: "12 أبريل 2025",
      applicantsCount: 5,
      status: "نشط"
    },
    {
      id: 102,
      title: "خدمات كهربائي",
      description: "كهربائي محترف بخبرة 10 سنوات. متاح لجميع الأعمال الكهربائية المنزلية والتجارية.",
      location: "الجزائر، الجزائر",
      publishedDate: "5 أبريل 2025",
      applicantsCount: 3,
      status: "نشط"
    }
  ];

  const appointments = [
    {
      id: 201,
      title: "استشارة للتجديد",
      with: "سفيان مباركي",
      date: "10 مايو 2025",
      time: "14:00",
      location: "مقهى رياض، الجزائر",
      status: "مؤكد"
    },
    {
      id: 202,
      title: "زيارة موقع عمل",
      with: "نادر حمو",
      date: "12 مايو 2025",
      time: "10:30",
      location: "إقامة الصنوبر، باب الزوار",
      status: "في الانتظار"
    }
  ];

  // Simplified filter logic
  const filterData = (data, searchFields, statusField) => {
    return data.filter(item => {
      const matchesSearch = searchFields.some(field =>
        item[field].toLowerCase().includes(searchTerm)
      );
      const matchesFilter = filterStatus === 'الكل' || item[statusField] === filterStatus;
      return (searchTerm ? matchesSearch : true) && matchesFilter;
    });
  };

  const filteredApplications = filterData(applications, ['title', 'name', 'location', 'description'], 'status');
  const filteredListings = filterData(myListings, ['title', 'description', 'location'], 'status');
  const filteredAppointments = filterData(appointments, ['title', 'with', 'location'], 'status');

  const renderContent = () => {
    switch (activeTab) {
      case 'candidatures':
        return (
          <div className="appSection">
            <div className="sectionTop">
              <h3 className="titleLarge boldText darkGray flex alignCenter gapSmall">
                <Briefcase size={20} className="indigoIcon" />
                طلباتك الأخيرة
              </h3>
              <div className="flex alignCenter gapSmall">
                <div className="positionRelative">
                  <button
                    className="paddingSmall grayText whiteBg borderGray roundedMedium flex alignCenter gapTiny smallText hoverLightGray"
                    onClick={toggleFilterMenu}
                  >
                    <Filter size={16} />
                    تصفية
                    <ChevronDown size={14} />
                  </button>
                  {filterMenuOpen && (
                    <div className="positionAbsolute rightZero topMarginSmall whiteBg borderGray roundedMedium shadowLarge paddingTiny zHigh widthMedium">
                      {['الكل', 'في الانتظار', 'مقبولة', 'جارٍ'].map(status => (
                        <button
                          key={status}
                          className="paddingMedium smallText grayText hoverGray wFull textLeft"
                          onClick={() => handleFilterChange(status)}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="positionRelative">
                  <input
                    type="text"
                    placeholder="البحث..."
                    className="paddingVerticalSmall paddingLeftLarge paddingRightMedium borderGray roundedMedium smallText focusOutline focusRingIndigo focusBorderIndigo"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Search size={16} className="positionAbsolute leftHalf topHalf grayIcon" />
                </div>
              </div>
            </div>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <div key={app.id} className="appCard">
                  <div className="appHeader">
                    <span className={`statusTag ${app.status.toLowerCase().replace(' ', '-')}`}>
                      {app.status}
                    </span>
                    <span className="appTime flex alignCenter gapTiny">
                      <Clock size={14} className="grayIcon" />
                      {app.time}
                    </span>
                  </div>
                  <div className="appContent">
                    <h4 className="flex alignCenter gapSmall">
                      <Users size={16} className="grayIcon" />
                      {app.name}
                    </h4>
                    <div className="appMeta">
                      <span>{app.location}</span>
                      {app.urgent && <span className="urgentTag">عاجل</span>}
                    </div>
                    <h5 className="mediumText">{app.title}</h5>
                    <p className="appDesc">{app.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="smallText grayText">لم يتم العثور على طلبات.</p>
            )}
          </div>
        );
      case 'annonces':
        return (
          <div className="listSection">
            <div className="sectionTop">
              <h3 className="titleLarge boldText darkGray flex alignCenter gapSmall">
                <FileText size={20} className="indigoIcon" />
                إعلاناتي المنشورة
              </h3>
              <div className="flex alignCenter gapSmall">
                <div className="positionRelative">
                  <button
                    className="paddingSmall grayText whiteBg borderGray roundedMedium flex alignCenter gapTiny smallText hoverLightGray"
                    onClick={toggleFilterMenu}
                  >
                    <Filter size={16} />
                    تصفية
                    <ChevronDown size={14} />
                  </button>
                  {filterMenuOpen && (
                    <div className="positionAbsolute rightZero topMarginSmall whiteBg borderGray roundedMedium shadowLarge paddingTiny zHigh widthMedium">
                      {['الكل', 'نشط', 'منتهية'].map(status => (
                        <button
                          key={status}
                          className="paddingMedium smallText grayText hoverGray wFull textLeft"
                          onClick={() => handleFilterChange(status)}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="positionRelative">
                  <input
                    type="text"
                    placeholder="البحث..."
                    className="paddingVerticalSmall paddingLeftLarge paddingRightMedium borderGray roundedMedium smallText focusOutline focusRingIndigo focusBorderIndigo"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Search size={16} className="positionAbsolute leftHalf topHalf grayIcon" />
                </div>
              </div>
            </div>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <div key={listing.id} className="listCard">
                  <div className="flex justifyBetween alignStart">
                    <h4 className="titleMedium boldText darkGray">{listing.title}</h4>
                    <span
                      className={`statusLabel smallText mediumWeight ${
                        listing.status === 'نشط' ? 'greenBg greenText' : 'grayBg grayText'
                      }`}
                    >
                      {listing.status}
                    </span>
                  </div>
                  <p className="smallText grayText topMarginSmall">{listing.description}</p>
                  <div className="flex alignCenter topMarginMedium smallText grayText">
                    <span className="flex alignCenter gapTiny marginRightMedium">
                      <Users size={14} />
                      {listing.applicantsCount} متقدمين
                    </span>
                    <span className="flex alignCenter gapTiny marginRightMedium">
                      <Clock size={14} />
                      نُشر في {listing.publishedDate}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="smallText grayText">لم يتم العثور على إعلانات.</p>
            )}
          </div>
        );
      case 'rendez-vous':
        return (
          <div className="apptSection">
            <div className="sectionTop">
              <h3 className="titleLarge boldText darkGray flex alignCenter gapSmall">
                <Clock size={20} className="indigoIcon" />
                مواعيدي
              </h3>
              <div className="flex alignCenter gapSmall">
                <div className="positionRelative">
                  <button
                    className="paddingSmall grayText whiteBg borderGray roundedMedium flex alignCenter gapTiny smallText hoverLightGray"
                    onClick={toggleFilterMenu}
                  >
                    <Filter size={16} />
                    تصفية
                    <ChevronDown size={14} />
                  </button>
                  {filterMenuOpen && (
                    <div className="positionAbsolute rightZero topMarginSmall whiteBg borderGray roundedMedium shadowLarge paddingTiny zHigh widthMedium">
                      {['الكل', 'مؤكد', 'في الانتظار'].map(status => (
                        <button
                          key={status}
                          className="paddingMedium smallText grayText hoverGray wFull textLeft"
                          onClick={() => handleFilterChange(status)}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="positionRelative">
                  <input
                    type="text"
                    placeholder="البحث..."
                    className="paddingVerticalSmall paddingLeftLarge paddingRightMedium borderGray roundedMedium smallText focusOutline focusRingIndigo focusBorderIndigo"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Search size={16} className="positionAbsolute leftHalf topHalf grayIcon" />
                </div>
              </div>
            </div>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt) => (
                <div key={appt.id} className="apptCard">
                  <div className="flex justifyBetween alignStart">
                    <h4 className="titleMedium boldText darkGray">{appt.title}</h4>
                    <span
                      className={`statusLabel smallText mediumWeight ${
                        appt.status === 'مؤكد' ? 'greenBg greenText' : 'yellowBg yellowText'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                  <div className="grid twoCols gapMedium topMarginMedium">
                    <div>
                      <p className="tinyText grayText bottomMarginTiny">مع</p>
                      <p className="smallText mediumWeight">{appt.with}</p>
                    </div>
                    <div>
                      <p className="tinyText grayText bottomMarginTiny">التاريخ والوقت</p>
                      <p className="smallText mediumWeight">{appt.date} الساعة {appt.time}</p>
                    </div>
                    <div className="fullCol">
                      <p className="tinyText grayText bottomMarginTiny">الموقع</p>
                      <p className="smallText mediumWeight">{appt.location}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="smallText grayText">لم يتم العثور على مواعيد.</p>
            )}
          </div>
        );
      default:
        return <p className="smallText grayText">اختر قسمًا لعرض المحتوى.</p>;
    }
  };

  return (
    <div className="mainContainer lightGrayBg minHeightScreen" dir="rtl">
      <div className="topNav whiteBg borderBottom grayBorder paddingAll">
        <div className="flex justifyBetween alignCenter">
          <h1 className="titleLarge boldText indigoText">كلشي ساهل</h1>
          <div className="flex alignCenter gapLarge">
            <button className="newAdBtn flex alignCenter gapMedium indigoBg hoverDarkIndigo">
              <PlusCircle size={18} />
              عرض جديد
            </button>
            <div className="positionRelative">
              <button
                className="paddingSmall whiteBg borderGray roundedFull grayText hoverLightGray"
                onClick={() => navigate('/cal')}
                title="الذهاب إلى التقويم"
              >
                <Calendar size={20} />
              </button>
            </div>
            <button
              className="profile-circle"
              onClick={() => navigate('/profile')}
              title="الذهاب إلى الملف الشخصي"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="mainContent paddingAll largePadding">
        <div className="gridLayout oneCol smallTwoCol largeFourCol gapMedium bottomMarginLarge">
          <div className="statCard whiteBg roundedMedium shadowSmall paddingLarge borderGray">
            <div className="flex alignCenter bottomMarginSmall">
              <div className="paddingSmall indigoLightBg roundedMedium marginRightMedium">
                <Briefcase size={20} className="indigoIcon" />
              </div>
              <p className="mediumText grayText">الطلبات</p>
            </div>
            <h2 className="largeTitle boldText darkGray">128</h2>
        
          </div>
          <div className="statCard whiteBg roundedMedium shadowSmall paddingLarge borderGray">
            <div className="flex alignCenter bottomMarginSmall">
              <div className="paddingSmall blueLightBg roundedMedium marginRightMedium">
                <FileText size={20} className="blueIcon" />
              </div>
              <p className="mediumText grayText">إعلاناتي</p>
            </div>
            <h2 className="largeTitle boldText darkGray">24</h2>
        
          </div>
          <div className="statCard whiteBg roundedMedium shadowSmall paddingLarge borderGray">
            <div className="flex alignCenter bottomMarginSmall">
              <div className="paddingSmall purpleLightBg roundedMedium marginRightMedium">
                <Clock size={20} className="purpleIcon" />
              </div>
              <p className="mediumText grayText">المواعيد</p>
            </div>
            <h2 className="largeTitle boldText darkGray">42</h2>
        
          </div>
          <div className="statCard whiteBg roundedMedium shadowSmall paddingLarge borderGray">
            <div className="flex alignCenter bottomMarginSmall">
              <div className="paddingSmall greenLightBg roundedMedium marginRightMedium">
                <Activity size={20} className="greenIcon" />
              </div>
              <p className="mediumText grayText">معدل الاستجابة</p>
            </div>
            <h2 className="largeTitle boldText darkGray">4.8</h2>
            
          </div>
        </div>

        <div className="bottomMarginLarge">
          <div className="borderBottom grayBorder">
            <nav className="flex negativeBottomMargin spaceHorizontalLarge">
              <button
                className={`paddingVerticalMedium paddingHorizontalTiny borderBottomMedium mediumWeight smallText flex alignCenter gapSmall ${activeTab === 'candidatures' ? 'indigoBorder indigoText' : 'transparentBorder grayText hoverGrayText hoverGrayBorder'}`}
                onClick={() => handleTabChange('candidatures')}
              >
                <Briefcase size={18} />
                الطلبات
              </button>
              <button
                className={`paddingVerticalMedium paddingHorizontalTiny borderBottomMedium mediumWeight smallText flex alignCenter gapSmall ${activeTab === 'annonces' ? 'indigoBorder indigoText' : 'transparentBorder grayText hoverGrayText hoverGrayBorder'}`}
                onClick={() => handleTabChange('annonces')}
              >
                <FileText size={18} />
                إعلاناتي
              </button>
              <button
                className={`paddingVerticalMedium paddingHorizontalTiny borderBottomMedium mediumWeight smallText flex alignCenter gapSmall ${activeTab === 'rendez-vous' ? 'indigoBorder indigoText' : 'transparentBorder grayText hoverGrayText hoverGrayBorder'}`}
                onClick={() => handleTabChange('rendez-vous')}
              >
                <Clock size={18} />
                المواعيد
              </button>
            </nav>
          </div>
        </div>

        <div className="mainContent flex largeFlexRow gapMedium">
          <div className="left-section">
            <div className="profile-completion">
              <h3 className="titleLarge boldText darkGray">إكمال ملفك الشخصي</h3>
              <div className="progress-bar">
                <div className="progress" style={{ width: '70%' }}></div>
              </div>
              <p className="smallText grayText">70%</p>
              <ul>
                <li className="completed">المعلومات الشخصية</li>
                <li className="completed">المهارات والخدمات</li>
                <li>الخبرات المهنية</li>
                <li>معرض الأعمال والصور</li>
              </ul>
            </div>
          </div>
          <div className="largeFlexTwo wFull">
            {renderContent()}
          </div>
          <div className="largeWidthMedium">
            <div className="notifications whiteBg roundedMedium shadowSmall paddingLarge borderGray bottomMarginLarge">
              <div className="flex justifyBetween alignCenter bottomMarginMedium">
                <h3 className="titleLarge boldText darkGray flex alignCenter gapSmall">
                  <Bell size={18} className="indigoIcon" />
                  الإشعارات
                </h3>
                <span className="indigoLightBg indigoText tinyText mediumWeight paddingHorizontalTiny paddingVerticalTiny roundedFull">
                  3 جديدة
                </span>
              </div>
              <div className="notificationItem">
                <div className="flexGrow">
                  <p className="smallText mediumWeight darkGray">رسالة جديدة من عميلك</p>
                  <p className="tinyText grayText topMarginTiny">منذ ساعتين</p>
                </div>
                <span className="notificationStatus pending">في الانتظار</span>
              </div>
              <div className="notificationItem">
                <div className="flexGrow">
                  <p className="smallText mediumWeight darkGray">طلبك للإعلان...</p>
                  <p className="tinyText grayText topMarginTiny">منذ 5 ساعات</p>
                </div>
                <span className="notificationStatus active">نشط</span>
              </div>
              <div className="notificationItem">
                <div className="flexGrow">
                  <p className="smallText mediumWeight darkGray">زيارة لملفك الشخصي</p>
                  <p className="tinyText grayText topMarginTiny">منذ يوم</p>
                </div>
                <span className="notificationStatus active">نشط</span>
              </div>
              <button className="viewAllBtn topMarginMedium wFull textCenter smallText mediumWeight indigoText hoverDarkIndigo">
                عرض جميع الإشعارات
              </button>
            </div>
            <div className="assistantCard whiteBg roundedMedium shadowSmall paddingLarge borderGray">
              <div className="flex alignCenter bottomMarginMedium">
                <div className="paddingSmall purpleLightBg roundedMedium marginRightMedium">
                  <Activity size={20} className="purpleIcon" />
                </div>
                <h3 className="titleLarge boldText darkGray">المساعد الذكي</h3>
              </div>
              <p className="assistantDesc smallText grayText bottomMarginMedium">
                أكمل ملفك الشخصي لجذب المزيد من العملاء وتحسين فرص نجاحك.
              </p>
              <button className="primaryBtn wFull flex alignCenter justifyCenter gapSmall">
                <Activity size={16} />
                تحسين ملفي الشخصي
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;