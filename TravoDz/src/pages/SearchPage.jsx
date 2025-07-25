import React, { useState } from 'react';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [filters, setFilters] = useState({
    categories: { سباك: false, كهربائي: false, بناء: false, دهان: false, نجار: false },
    ratings: { '4 ★ فأكثر': false, '3 ★ فأكثر': false, '2 ★ فأكثر': false },
    distance: { '10 كم فأكثر': false, '20 كم فأكثر': false },
    availability: { 'متوفر الآن': false, 'متوفر للصيانة': false, 'حرفيون موثوقون': false },
  });

  const artisans = [
    { name: 'محمد سعيدي', profession: 'بنّاء', location: 'الجزائر، الجزائر', rating: 4.5, reviews: 128, description: 'أكثر من 5 سنوات من الخبرة في البناء وأعمال البناء...' },
    { name: 'أمينة خليفي', profession: 'سباك', location: 'وهران، الجزائر', rating: 4.2, reviews: 45, description: 'متخصصة في السباكة، عمل متقن، متوفرة فورًا...' },
    { name: 'يوسف بن موسى', profession: 'دهّان', location: 'قسنطينة، الجزائر', rating: 4.0, reviews: 89, description: 'خبير في الدهان، أكثر من 10 سنوات في أعمال التجديد...' },
    { name: 'كريم حاج', profession: 'كهربائي', location: 'وهران، الجزائر', rating: 4.8, reviews: 150, description: 'خبرة مهنية 10 سنوات، تركيب وإصلاح...' },
    { name: 'فاطمة الزهراء', profession: 'نجار', location: 'الجزائر، الجزائر', rating: 4.6, reviews: 72, description: 'متخصصة في النجارة، عمل متقن، متوفرة الآن...' },
  ];

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: { ...prev[category], [value]: !prev[category][value] },
    }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Filtrer les artisans selon la recherche
  const filteredArtisans = searchQuery 
    ? artisans.filter(artisan => 
        artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="app__search" dir="rtl">
      <button className="app__filter-toggle" onClick={toggleSidebar}>
        {isSidebarVisible ? 'إخفاء الفلاتر' : 'إظهار فلاتر البحث'}
      </button>
      
      <div className={`app__sidebar ${!isSidebarVisible ? 'collapsed' : ''}`}>
        <h2 className="app__sidebar-title">فلاتر البحث</h2>
        <div className="app__filter-group">
          <h3 className="app__filter-heading">الفئات</h3>
          {Object.keys(filters.categories).map(key => (
            <label key={key} className="app__filter-label">
              <input
                type="checkbox"
                className="app__filter-checkbox"
                checked={filters.categories[key]}
                onChange={() => handleFilterChange('categories', key)}
              />
              {key}
            </label>
          ))}
        </div>
        <div className="app__filter-group">
          <h3 className="app__filter-heading">التقييم</h3>
          {Object.keys(filters.ratings).map(key => (
            <label key={key} className="app__filter-label">
              <input
                type="checkbox"
                className="app__filter-checkbox"
                checked={filters.ratings[key]}
                onChange={() => handleFilterChange('ratings', key)}
              />
              {key}
            </label>
          ))}
        </div>
        <div className="app__filter-group">
          <h3 className="app__filter-heading">المسافة</h3>
          {Object.keys(filters.distance).map(key => (
            <label key={key} className="app__filter-label">
              <input
                type="checkbox"
                className="app__filter-checkbox"
                checked={filters.distance[key]}
                onChange={() => handleFilterChange('distance', key)}
              />
              {key}
            </label>
          ))}
        </div>
        <div className="app__filter-group">
          <h3 className="app__filter-heading">التوافر</h3>
          {Object.keys(filters.availability).map(key => (
            <label key={key} className="app__filter-label">
              <input
                type="checkbox"
                className="app__filter-checkbox"
                checked={filters.availability[key]}
                onChange={() => handleFilterChange('availability', key)}
              />
              {key}
            </label>
          ))}
        </div>
        <button className="app__filter-apply">تطبيق الفلاتر</button>
      </div>

      <div className="app__content">
        <div className="app__search-controls">
          <input
            type="text"
            className="app__search-input"
            placeholder="ابحث عن حرفيين (مثال: سباك)..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="app__search-button">بحث</button>
          <select className="app__location-select">
            <option value="location">الموقع</option>
            <option value="alger">الجزائر</option>
            <option value="oran">وهران</option>
            <option value="constantine">قسنطينة</option>
          </select>
        </div>
        
        <div className="app__artisans-grid">
          {filteredArtisans.length === 0 && searchQuery === '' ? (
            <div className="app__empty-state">
              <p>أدخل كلمة بحث للعثور على حرفيين</p>
            </div>
          ) : filteredArtisans.length === 0 ? (
            <div className="app__empty-state">
              <p>لم يتم العثور على حرفيين لـ "{searchQuery}"</p>
            </div>
          ) : (
            filteredArtisans.map((artisan, index) => (
              <div key={index} className="app__artisan-card">
                <div className="app__artisan-image"></div>
                <div className="app__artisan-details">
                  <h3 className="app__artisan-name">{artisan.name}</h3>
                  <p className="app__artisan-profession">{artisan.profession}</p>
                  <p className="app__artisan-location">{artisan.location}</p>
                  <div className="app__artisan-rating">
                    {'★'.repeat(Math.floor(artisan.rating)) +
                      '☆'.repeat(5 - Math.floor(artisan.rating))}
                    <span className="app__artisan-reviews">({artisan.reviews} تقييم)</span>
                  </div>
                  <p className="app__artisan-description">{artisan.description}</p>
                </div>
                <div className="app__artisan-actions">
                  <button className="app__btn-contact">تواصل</button>
                  <button className="app__btn-profile">عرض الملف الشخصي</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;