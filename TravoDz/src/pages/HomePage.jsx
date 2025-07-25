import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Heart,
  MessageCircle,
  User,
  Bell,
  Mail,
  FileText,
  Settings,
  Calendar,
  HelpCircle,
  Home,
  X,
  LogOut,
  Search,
  CreditCard
} from 'lucide-react';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('accueil');
  const [showModal, setShowModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    location: '',
    urgent: false
  });
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "أحمد بن علي",
      email: "[ahmed.benali@example.com](mailto:ahmed.benali@example.com)",
      phoneNumber: "+213 555 123 456",
      title: "سباكة",
      description: "أبحث عن سباك لإصلاح تسرب في حمامي بالجزائر. التوفر المطلوب: نهاية الأسبوع. الميزانية: 5000 دج.",
      location: "الجزائر، الجزائر",
      urgent: true,
      likes: 12,
      likedByUser: false,
      comments: 7,
      commentList: [
        { id: 1, user: "كريم حاج", text: "أنا متوفر يوم السبت. سأتواصل معك عبر الرسائل.", time: "منذ ساعة" },
        { id: 2, user: "سفيان مباركي", text: "أعرف سباكًا جيدًا في الجزائر، سأرسل لك تفاصيله.", time: "منذ 30 دقيقة" }
      ],
      time: "منذ ساعتين",
      showComments: false,
      newComment: ''
    },
    {
      id: 2,
      name: "كريم حاج",
      email: "[karim.hadj@example.com](mailto:karim.hadj@example.com)",
      phoneNumber: "+213 555 987 654",
      title: "تركيب كهربائي",
      description: "أقدم خدمات كهربائي للتركيب، الإصلاح، أو استكشاف الأعطال، خبرة 10 سنوات.",
      location: "وهران، الجزائر",
      urgent: false,
      likes: 5,
      likedByUser: false,
      comments: 2,
      commentList: [
        { id: 1, user: "نادية بن مالك", text: "هل تنتقل إلى سيدي بلعباس؟", time: "منذ 5 ساعات" },
        { id: 2, user: "عمر تازي", text: "ما هو أجرك بالساعة؟", time: "منذ 22 ساعة" }
      ],
      time: "منذ يوم",
      showComments: false,
      newComment: ''
    },
  ]);

  const handleSearchRedirect = () => {
    navigate('/search');
  };

  const commentInputRefs = useRef({});

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

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

  const handleUserIconClick = () => {
    navigate('/profile');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleContactModal = (post) => {
    setSelectedPost(post);
    setShowContactModal(!showContactModal);
  };

  const handleNewPostChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPost({
      ...newPost,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleLogout = () => {
    console.log("تسجيل خروج المستخدم");
    navigate('/login');
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const newPostObject = {
      id: posts.length + 1,
      name: "المستخدم الحالي",
      email: "[user@example.com](mailto:user@example.com)", // يجب استبداله ببريد المستخدم الحالي
      phoneNumber: "+213 555 000 000", // يجب استبداله برقم المستخدم الحالي
      title: newPost.title,
      description: newPost.description,
      location: newPost.location,
      urgent: newPost.urgent,
      likes: 0,
      likedByUser: false,
      comments: 0,
      commentList: [],
      time: "الآن",
      showComments: false,
      newComment: ''
    };

    setPosts([newPostObject, ...posts]);
    setNewPost({
      title: '',
      description: '',
      location: '',
      urgent: false
    });
    setShowModal(false);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLikedState = !post.likedByUser;
        return {
          ...post,
          likedByUser: newLikedState,
          likes: newLikedState ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const toggleComments = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          showComments: !post.showComments
        };
      }
      return post;
    }));
  };

  const handleCommentChange = (postId, value) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          newComment: value
        };
      }
      return post;
    }));
  };

  const addComment = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.newComment.trim()) {
        const newCommentObj = {
          id: post.commentList.length + 1,
          user: "المستخدم الحالي",
          text: post.newComment,
          time: "الآن"
        };
        return {
          ...post,
          comments: post.comments + 1,
          commentList: [...post.commentList, newCommentObj],
          newComment: ''
        };
      }
      return post;
    }));
  };

  const handleKeyPress = (e, postId) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addComment(postId);
    }
  };

  const handleChatRedirect = (postId) => {
    navigate(`/msg?chatWith=${postId}`);
    setShowContactModal(false);
  };

  const filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(searchTerm) ||
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm) ||
    post.location.toLowerCase().includes(searchTerm)
  );

  const recommendedArtisans = [
    { id: 1, name: "محمد سعيد", profession: "سباك", rating: 4.8, reviews: 17 },
    { id: 2, name: "أمين خير الدين", profession: "كهربائي", rating: 4.5, reviews: 10 },
    { id: 3, name: "يوسف بن موسى", profession: "دهان", rating: 4.3, reviews: 8 }
  ];

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
            placeholder="البحث عن حرفيين أو خدمات..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
        <div className="header-end">
          <button
            className="search-button"
            onClick={handleSearchRedirect}
            title="بحث متقدم"
          >
            <Search size={20} />
          </button>
          <button className="alert-button">
            <Bell size={20} />
            <span className="alert-badge">3</span>
          </button>
          <div className="profile-avatar" onClick={handleUserIconClick}>
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
              className={`menu-option ${activeTab === 'paiements' ? 'active' : ''}`}
              onClick={() => navigate('/payment')}
            >
              <CreditCard size={20} />
              <span>المدفوعات</span>
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

        {/* Central Content */}
        <div className="core-content">
          <div className="new-post-section">
            <div className="post-input-area">
              <div className="profile-avatar small">
                <User size={16} />
              </div>
              <input
                type="text"
                placeholder="ما الخدمة التي تبحث عنها؟"
                className="post-textbox"
                onClick={toggleModal}
                readOnly
              />
              <button className="submit-post-btn" onClick={toggleModal}>
                <PlusCircle size={18} /> نشر
              </button>
            </div>
          </div>

          {/* Post List */}
          <div className="post-feed">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id} className="post-block">
                  <div className="post-header">
                    <div className="author-info">
                      <div className="profile-avatar">
                        <User size={20} />
                      </div>
                      <div>
                        <h3>{post.name}</h3>
                        <span className="post-meta">{post.location} • {post.time}</span>
                      </div>
                    </div>
                    {post.urgent && <span className="priority-tag">عاجل</span>}
                  </div>
                  <div className="post-content">
                    <h4>{post.title}</h4>
                    <p>{post.description}</p>
                  </div>
                  <div className="post-actions">
                    <button
                      className={`interact-btn ${post.likedByUser ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart size={18} fill={post.likedByUser ? "#1877f2" : "none"} color={post.likedByUser ? "#1877f2" : "currentColor"} /> {post.likes}
                    </button>
                    <button
                      className={`interact-btn ${post.showComments ? 'active' : ''}`}
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageCircle size={18} /> {post.comments}
                    </button>
                    <button className="reach-out-btn" onClick={() => toggleContactModal(post)}>
                      تواصل
                    </button>
                  </div>

                  {/* Comment Area */}
                  {post.showComments && (
                    <div className="comments-block">
                      {post.commentList.length > 0 ? (
                        <div className="comment-thread">
                          {post.commentList.map(comment => (
                            <div key={comment.id} className="comment-post">
                              <div className="comment-owner">
                                <div className="profile-avatar small">
                                  <User size={14} />
                                </div>
                                <div className="comment-text">
                                  <div className="comment-header">
                                    <span className="commenter-name">{comment.user}</span>
                                    <span className="comment-timestamp">{comment.time}</span>
                                  </div>
                                  <p className="comment-message">{comment.text}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="empty-comments">لا توجد تعليقات حاليًا</p>
                      )}
                      <div className="comment-input-section">
                        <div className="profile-avatar small">
                          <User size={14} />
                        </div>
                        <textarea
                          ref={el => commentInputRefs.current[post.id] = el}
                          className="comment-box"
                          placeholder="كتابة تعليق..."
                          value={post.newComment}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, post.id)}
                        />
                        <button
                          className="comment-send-btn"
                          onClick={() => addComment(post.id)}
                          disabled={!post.newComment.trim()}
                        >
                          نشر
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-feed">
                <p>لم يتم العثور على نتائج</p>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <aside className="sidebar-right">
          <div className="sidebar-top">
            <div className="sidebar-block">
              <h3>الحرفيون الموصى بهم</h3>
              {recommendedArtisans.map(artisan => (
                <div key={artisan.id} className="artisan-card">
                  <div className="artisan-profile">
                    <div className="profile-avatar small">
                      <User size={16} />
                    </div>
                    <div>
                      <h4>{artisan.name}</h4>
                      <span className="artisan-data">{artisan.profession} - {artisan.rating} ({artisan.reviews})</span>
                    </div>
                  </div>
                  <button className="connect-btn">تواصل</button>
                </div>
              ))}
              <button className="explore-btn" onClick={() => navigate('/search')}>
                اكتشف المزيد من الحرفيين
              </button>
            </div>
          </div>
          <div className="sidebar-bottom">
            <div className="sidebar-block support-section">
              <h3>هل تحتاج إلى مساعدة؟</h3>
              <p>يمكن لمساعدنا الذكي الإجابة على أسئلتك ومساعدتك في العثور على الحرفي المناسب.</p>
              <button className="help-btn" onClick={() => navigate('/msg')}>
                <HelpCircle size={18} /> الدردشة مع المساعد
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Modal for Publishing a Post */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-window" dir="rtl">
            <div className="modal-header">
              <h2>نشر إعلان</h2>
              <button className="modal-close-btn" onClick={toggleModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitPost} className="post-form">
              <div className="input-group">
                <label htmlFor="title">العنوان</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newPost.title}
                  onChange={handleNewPostChange}
                  placeholder="مثال: سباك لإصلاح عاجل"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="description">الوصف</label>
                <textarea
                  id="description"
                  name="description"
                  value={newPost.description}
                  onChange={handleNewPostChange}
                  placeholder="صف ما تحتاجه..."
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="input-group">
                <label htmlFor="location">الموقع</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newPost.location}
                  onChange={handleNewPostChange}
                  placeholder="مثال: الجزائر، الجزائر"
                  required
                />
              </div>
              <div className="checkbox-option">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={newPost.urgent}
                    onChange={handleNewPostChange}
                  />
                  <span className="checkbox-text">تصنيف كعاجل</span>
                </label>
              </div>
              <div className="form-controls">
                <button type="button" className="discard-btn" onClick={toggleModal}>إلغاء</button>
                <button type="submit" className="save-post-btn">نشر الإعلان</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Contact */}
      {showContactModal && selectedPost && (
        <div className="contact-modal-overlay">
          <div className="contact-modal-window" dir="rtl">
            <div className="contact-modal-header">
              <h3>معلومات التواصل</h3>
              <button className="contact-modal-close-btn" onClick={() => toggleContactModal(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="contact-modal-content">
              <div className="contact-modal-profile">
                <div className="profile-avatar small">
                  <User size={16} />
                </div>
                <div>
                  <h4>{selectedPost.name}</h4>
                </div>
              </div>
              <div className="contact-modal-info">
                <p><strong>البريد الإلكتروني:</strong> {selectedPost.email}</p>
                <p><strong>الهاتف:</strong> {selectedPost.phoneNumber}</p>
              </div>
            </div>
            <div className="contact-modal-actions">
              <button className="contact-modal-chat-btn" onClick={() => handleChatRedirect(selectedPost.id)}>
                <Mail size={16} /> دردشة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;