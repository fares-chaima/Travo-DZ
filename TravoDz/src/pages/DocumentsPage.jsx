import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  PlusCircle, 
  Search, 
  Download, 
  Share2, 
  Trash2, 
  Pin, 
  Image,
  ChevronDown,
  X,
  Home,
  User,
  Mail,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Bell
} from 'lucide-react';
import '../styles/DocumentsPage.css';

const DocumentsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('documents');
  
  // États pour les documents
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "تسعيرة سباكة الحمام",
      type: "devis",
      date: "15/10/2023",
      artisan: "محمد سعيدي",
      size: "2.4 ميغابايت",
      pinned: true
    },
    {
      id: 2,
      title: "عقد تركيب كهربائي",
      type: "contrat",
      date: "10/10/2023",
      artisan: "كريم حاج",
      size: "1.8 ميغابايت",
      pinned: false
    },
    {
      id: 3,
      title: "فاتورة دهان الصالون",
      type: "facture",
      date: "05/10/2023",
      artisan: "فاطمة الزهراء",
      size: "1.2 ميغابايت",
      pinned: false
    },
    {
      id: 4,
      title: "صور قبل الأشغال",
      type: "photo",
      date: "01/10/2023",
      artisan: "نادر حمو",
      size: "4.5 ميغابايت",
      pinned: true
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState("tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: "",
    type: "devis",
    file: null
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
    // Logique de déconnexion
    navigate('/login');
  };

  // Filtrer les documents
  const filteredDocs = documents.filter(doc => {
    const matchesFilter = selectedFilter === "tous" || doc.type === selectedFilter;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.artisan.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Toggle pin document
  const togglePin = (id) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === id ? { ...doc, pinned: !doc.pinned } : doc
      )
    );
  };

  // Supprimer un document
  const deleteDocument = (id) => {
    setDocuments(docs => docs.filter(doc => doc.id !== id));
  };

  // Gérer l'upload
  const handleFileChange = (e) => {
    setNewDocument({
      ...newDocument,
      file: e.target.files[0]
    });
  };

  // Ajouter un nouveau document
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDocument.title || !newDocument.file) return;

    const newDoc = {
      id: documents.length + 1,
      title: newDocument.title,
      type: newDocument.type,
      date: new Date().toLocaleDateString('ar-DZ'), // تنسيق التاريخ بالعربية
      artisan: "أنا",
      size: `${(newDocument.file.size / (1024 * 1024)).toFixed(1)} ميغابايت`,
      pinned: false
    };

    setDocuments([newDoc, ...documents]);
    setNewDocument({ title: "", type: "devis", file: null });
    setShowUploadModal(false);
  };

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
            placeholder="البحث في الوثائق..."
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
          <div className="documents-page">
            {/* Header */}
            <div className="documents-header">
              <h1>
                <FileText size={24} className="header-icon" />
                وثائقي
              </h1>
              
              <div className="actions-container">
                <div className="search-container">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="البحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="filter-container">
                  <select 
                    value={selectedFilter} 
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="tous">الكل</option>
                    <option value="devis">تسعيرات</option>
                    <option value="contrat">عقود</option>
                    <option value="facture">فواتير</option>
                    <option value="photo">صور</option>
                  </select>
                  <ChevronDown size={16} className="dropdown-icon" />
                </div>
                
                <button 
                  className="add-button"
                  onClick={() => setShowUploadModal(true)}
                >
                  <PlusCircle size={18} />
                  <span>إضافة</span>
                </button>
              </div>
            </div>

            {/* Documents List */}
            <div className="documents-grid">
              {filteredDocs.length > 0 ? (
                filteredDocs
                  .sort((a, b) => b.pinned - a.pinned)
                  .map(doc => (
                    <div 
                      key={doc.id} 
                      className={`document-card ${doc.pinned ? 'pinned' : ''}`}
                    >
                      <div className="card-header">
                        <div className="doc-icon">
                          {doc.type === "devis" && <FileText className="devis" />}
                          {doc.type === "contrat" && <FileText className="contract" />}
                          {doc.type === "facture" && <FileText className="invoice" />}
                          {doc.type === "photo" && <Image className="photo" />}
                        </div>
                        <button 
                          className={`pin-btn ${doc.pinned ? 'pinned' : ''}`}
                          onClick={() => togglePin(doc.id)}
                        >
                          <Pin size={16} />
                        </button>
                      </div>
                      
                      <div className="card-body">
                        <h3>{doc.title}</h3>
                        <div className="doc-meta">
                          <span className="artisan">{doc.artisan}</span>
                          <span className="date">{doc.date}</span>
                          <span className="size">{doc.size}</span>
                        </div>
                      </div>
                      
                      <div className="card-actions">
                        <button className="action-btn download">
                          <Download size={16} />
                        </button>
                        <button className="action-btn share">
                          <Share2 size={16} />
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="empty-state">
                  <FileText size={48} className="empty-icon" />
                  <p>لم يتم العثور على وثائق</p>
                  <button 
                    className="add-button"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <PlusCircle size={18} />
                    <span>إضافة وثيقة</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <aside className="sidebar-right">
          <div className="sidebar-top">
            <div className="sidebar-block">
              <h3>الوثائق الأخيرة</h3>
              {documents.slice(0, 3).map(doc => (
                <div key={doc.id} className="recent-doc">
                  <div className="doc-icon small">
                    {doc.type === "devis" && <FileText className="devis" />}
                    {doc.type === "contrat" && <FileText className="contract" />}
                    {doc.type === "facture" && <FileText className="invoice" />}
                    {doc.type === "photo" && <Image className="photo" />}
                  </div>
                  <div>
                    <h4>{doc.title}</h4>
                    <span className="doc-meta">{doc.date} • {doc.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sidebar-bottom">
            <div className="sidebar-block support-section">
              <h3>هل تحتاج إلى مساعدة؟</h3>
              <p>يمكن لمساعدنا مساعدتك في تنظيم وثائقك.</p>
              <button className="help-btn">
                <HelpCircle size={18} /> الدعم
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>إضافة وثيقة</h2>
              <button 
                className="close-btn"
                onClick={() => setShowUploadModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>عنوان الوثيقة</label>
                <input
                  type="text"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                  placeholder="مثال: تسعيرة سباكة"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>نوع الوثيقة</label>
                <select
                  value={newDocument.type}
                  onChange={(e) => setNewDocument({...newDocument, type: e.target.value})}
                >
                  <option value="devis">تسعيرة</option>
                  <option value="contrat">عقد</option>
                  <option value="facture">فاتورة</option>
                  <option value="photo">صورة</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>الملف</label>
                <div className="file-upload">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    required
                  />
                  <span>{newDocument.file ? newDocument.file.name : "اختر ملفًا"}</span>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowUploadModal(false)}
                >
                  إلغاء
                </button>
                <button 
                  type="submit"
                  className="submit-btn"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;