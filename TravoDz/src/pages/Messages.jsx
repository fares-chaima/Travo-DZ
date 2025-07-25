import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Paperclip, 
  User as UserIcon,
  ChevronRight,
  Circle,
  Search,
  MoreVertical
} from 'lucide-react';
import '../styles/Messages.css';

const Messages = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "محمد سعيدي",
      role: "سباك",
      online: true,
      unread: 2,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      messages: [
        {
          id: 1,
          text: "مرحبًا، أنا متوفر غدًا لأعمال السباكة. في أي وقت تريد مني أن أمر؟",
          time: "10:30",
          incoming: true,
          date: "today"
        },
        {
          id: 2,
          text: "مرحبًا، شكرًا على ردك. هل يمكنك المرور حوالي الساعة 14:00؟",
          time: "10:32",
          incoming: false,
          date: "today"
        },
        {
          id: 3,
          text: "نعم، الساعة 14:00 مناسبة تمامًا. أؤكد حضوري. هل يمكنك تزويدي بالعنوان الدقيق؟",
          time: "10:35",
          incoming: true,
          date: "today"
        },
        {
          id: 4,
          text: "ممتاز! العنوان هو 15 شارع الزيتون، وهران. المبنى أبيض، الطابق الثالث. سأرسل لك موقعي.",
          time: "10:40",
          incoming: false,
          date: "today"
        }
      ]
    },
    {
      id: 2,
      name: "المساعد الذكي",
      role: "مساعد",
      online: false,
      unread: 0,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kHDaFxRQJzRhdWMmxf1p5KLIned9M3W3pg9awFHrAkIpHYJ3IqfkolhgaWeXZ1pZlrc&usqp=CAU",
      messages: [
        {
          id: 1,
          text: "يمكنني مساعدتك في العثور على كهربائي مؤهل في منطقتك. ما نوع العمل الذي تحتاجه؟",
          time: "أمس",
          incoming: true,
          date: "yesterday"
        }
      ]
    },
    {
      id: 3,
      name: "أمينة خليفي",
      role: "كهربائية",
      online: false,
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      messages: [
        {
          id: 1,
          text: "شكرًا على طلبك. أتواصل معك لمناقشة تفاصيل التركيب الكهربائي.",
          time: "أمس",
          incoming: true,
          date: "yesterday"
        }
      ]
    }
  ]);

  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0]);
    }
  }, [conversations, activeConversation]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !activeConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        const newMsg = {
          id: conv.messages.length + 1,
          text: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          incoming: false,
          date: "today"
        };

        return {
          ...conv,
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setActiveConversation(
      updatedConversations.find(conv => conv.id === activeConversation.id)
    );
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-interface" dir="rtl">
      <div className="chat-sidebar">
        <div className="sidebar-heading">
          <h2>الرسائل</h2>
          <div className="search-field">
            <Search size={18} className="search-symbol" />
            <input
              type="text"
              placeholder="البحث عن محادثات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="chat-list">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              className={`chat-item ${activeConversation?.id === conversation.id ? 'active' : ''}`}
              onClick={() => setActiveConversation(conversation)}
            >
              <div className="profile-picture">
                <img src={conversation.avatar} alt={conversation.name} className="user-image" />
                {conversation.online && <span className="status-dot"></span>}
              </div>
              
              <div className="chat-details">
                <div className="chat-title">
                  <h3>{conversation.name}</h3>
                  <span className="chat-timestamp">
                    {conversation.messages[conversation.messages.length - 1]?.time}
                  </span>
                </div>
                
                <div className="chat-preview">
                  <p className="last-text">
                    {conversation.messages[conversation.messages.length - 1]?.text.substring(0, 30)}...
                  </p>
                  {conversation.unread > 0 && (
                    <span className="unread-badge">{conversation.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className='assistant-action'>
          مساعد كلشي ساهل
        </button>
      </div>

      {activeConversation ? (
        <div className="chat-main">
          <div className="chat-main-header">
            <div className="chat-user-profile">
              <div className="profile-picture">
                <img src={activeConversation.avatar} alt={activeConversation.name} className="user-image" />
                {activeConversation.online && <span className="status-dot"></span>}
              </div>
              
              <div className="profile-info">
                <h3>{activeConversation.name}</h3>
                <p className="user-online-status">
                  {activeConversation.online ? 'متصل' : 'غير متصل'}
                </p>
              </div>
            </div>
            
            <div className="chat-controls">
              <button className="profile-view-action">عرض الملف الشخصي</button>
              <button className="options-menu">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {activeConversation.messages.map((message, index) => {
              const showDateDivider = index === 0 || 
                (index > 0 && message.date !== activeConversation.messages[index - 1].date);

              return (
                <React.Fragment key={message.id}>
                  {showDateDivider && (
                    <div className="date-divider">
                      {message.date === "today" ? "اليوم" : "أمس"}
                    </div>
                  )}
                  <div className={`message-bubble ${message.incoming ? 'received' : 'sent'}`}>
                    <div className="message-text">
                      <p>{message.text}</p>
                      <span className="message-time">{message.time}</span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-section">
            <button className="attach-file-btn">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              placeholder="اكتب رسالة..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="send-message-btn"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="no-chat-selected">
          <div className="no-chat-placeholder">
            <h3>اختر محادثة</h3>
            <p>اختر محادثة موجودة أو ابدأ واحدة جديدة</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;