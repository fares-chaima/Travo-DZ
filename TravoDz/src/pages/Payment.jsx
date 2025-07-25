import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Smartphone, User, CreditCard } from 'lucide-react';
import '../styles/Payment.css';
import baridiMobLogo from '../assets/f.png';

const Payment = () => {
  const navigate = useNavigate();

  // Liste des artisans disponibles
  const artisansList = [
    {
      id: 1,
      name: "محمد سعيدي",
      profession: "سباك",
      phone: "+213 555 123 456",
      baridiMobNumber: "0555123456"
    },
    {
      id: 2,
      name: "كريم حاج",
      profession: "كهربائي",
      phone: "+213 555 987 654",
      baridiMobNumber: "0555987654"
    },
    {
      id: 3,
      name: "فاطمة الزهراء",
      profession: "دهّان",
      phone: "+213 555 111 222",
      baridiMobNumber: "0555111222"
    }
  ];

  // Artisan sélectionné ou premier artisan par défaut
  const [selectedArtisan, setSelectedArtisan] = useState(artisansList[0]);
  const [paymentData, setPaymentData] = useState({
    amount: '',
    cardNumber: '',
    secretCode: ''
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // دالة لتنسيق رقم البطاقة (إضافة مسافات كل 4 أرقام)
  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, ''); // إزالة أي شيء غير رقم
    const parts = numbers.match(/.{1,4}/g); // تقسيم إلى مجموعات من 4
    return parts ? parts.join(' ') : numbers;
  };

  const handleArtisanChange = (e) => {
    const artisanId = parseInt(e.target.value);
    const artisan = artisansList.find(a => a.id === artisanId);
    setSelectedArtisan(artisan);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const formattedValue = formatCardNumber(value);
      setPaymentData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setPaymentData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep1 = () => {
    const cleanCardNumber = paymentData.cardNumber.replace(/\s/g, '');
    return paymentData.amount > 0 && cleanCardNumber.length === 16;
  };

  const validateStep2 = () => {
    return paymentData.secretCode.length === 4 && /^\d{4}$/.test(paymentData.secretCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation de paiement
    setTimeout(() => {
      setIsLoading(false);
      setPaymentStatus('success');
      console.log('تم إرسال الدفع عبر بريدي موب', {
        ...paymentData,
        cardNumber: paymentData.cardNumber.replace(/\s/g, ''), // إزالة المسافات للمعالجة
        artisan: selectedArtisan
      });
    }, 2000);
  };

  const resetPayment = () => {
    setPaymentStatus(null);
    setStep(1);
    setPaymentData({
      amount: '',
      cardNumber: '',
      secretCode: ''
    });
  };

  return (
    <div className="transact-wrapper" dir="rtl">
      <header className="transact-topbar">
        <button onClick={() => navigate(-1)} className="nav-return">
          <ArrowLeft size={20} />
        </button>
        <div className="topbar-title">
          <h2>الدفع عبر بريدي موب</h2>
        </div>
      </header>

      {paymentStatus === 'success' ? (
        <div className="success-message">
          <CheckCircle size={60} color="#4CAF50" />
          <h3>تم الدفع بنجاح!</h3>
          <p>تم إرسال دفع بقيمة {paymentData.amount} دج إلى {selectedArtisan.name}.</p>
          <div className="transact-recap">
            <p><strong>الحرفي:</strong> {selectedArtisan.name}</p>
            <p><strong>رقم بريدي موب:</strong> {selectedArtisan.baridiMobNumber}</p>
            <p><strong>التاريخ:</strong> {new Date().toLocaleString('ar-DZ')}</p>
          </div>
          <button onClick={resetPayment} className="confirm-action">
            إجراء دفع جديد
          </button>
        </div>
      ) : paymentStatus === 'error' ? (
        <div className="error-message">
          <XCircle size={60} color="#F44336" />
          <h3>فشل الدفع</h3>
          <p>حدث خطأ أثناء معالجة دفعك.</p>
          <button onClick={resetPayment} className="confirm-action">
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="transact-form">
          <div className="worker-details">
            <img src={baridiMobLogo} alt="شعار بريدي موب" className="baridi-logo-large" />
            <div className="worker-info">
              <div className="worker-icon">
                <User size={24} />
              </div>
              <div>
                <h3>{selectedArtisan.name}</h3>
                <p>{selectedArtisan.profession}</p>
              </div>
            </div>
            
            {/* Sélecteur d'artisan */}
            <select 
              className="artisan-dropdown"
              value={selectedArtisan.id}
              onChange={handleArtisanChange}
            >
              {artisansList.map(artisan => (
                <option key={artisan.id} value={artisan.id}>
                  {artisan.name} ({artisan.profession})
                </option>
              ))}
            </select>
          </div>

          {step === 1 && (
            <>
              <div className="field-box">
                <label>المبلغ (دج)</label>
                <input
                  type="number"
                  name="amount"
                  value={paymentData.amount}
                  onChange={handleChange}
                  placeholder="أدخل المبلغ"
                  min="100"
                  required
                />
              </div>

              <div className="field-box">
                <label>رقم بطاقة ذهبية</label>
                <div className="field-icon-wrap">
                  <CreditCard size={20} />
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength="19" // 16 أرقام + 3 مسافات
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                className="confirm-action"
                onClick={() => setStep(2)}
                disabled={!validateStep1()}
              >
                متابعة
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="transact-guide">
                <p>ستتلقى رسالة نصية تحتوي على رمز سري مكون من 4 أرقام.</p>
              </div>

              <div className="field-box">
                <label>الرمز السري</label>
                <div className="field-icon-wrap">
                  <CreditCard size={20} />
                  <input
                    type="password"
                    name="secretCode"
                    value={paymentData.secretCode}
                    onChange={handleChange}
                    placeholder="رمز مكون من 4 أرقام"
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div className="transact-overview">
                <h4>ملخص الدفع</h4>
                <div className="overview-line">
                  <span>الحرفي:</span>
                  <span>{selectedArtisan.name}</span>
                </div>
                <div className="overview-line">
                  <span>رقم بريدي موب:</span>
                  <span>{selectedArtisan.baridiMobNumber}</span>
                </div>
                <div className="overview-line">
                  <span>المبلغ:</span>
                  <span>{paymentData.amount} دج</span>
                </div>
                <div className="overview-line">
                  <span>الرسوم:</span>
                  <span>10 دج</span> {/* ملاحظة: يمكن تعديل هذا بناءً على منطق الرسوم */}
                </div>
                <div className="overview-line total">
                  <span>الإجمالي:</span>
                  <span>{parseInt(paymentData.amount) + 10} دج</span>
                </div>
              </div>

              <button
                type="submit"
                className="confirm-action"
                disabled={!validateStep2() || isLoading}
              >
                {isLoading ? 'جارٍ المعالجة...' : 'تأكيد الدفع'}
              </button>

              <button
                type="button"
                className="prev-step"
                onClick={() => setStep(1)}
              >
                رجوع
              </button>
            </>
          )}
        </form>
      )}

      <div className="secure-note">
        <CheckCircle size={16} color="#4CAF50" />
        <span>دفع آمن عبر بريدي موب</span>
      </div>
    </div>
  );
};

export default Payment;