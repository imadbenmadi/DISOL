import React, { useState, useEffect } from 'react';

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 0
  });

  // Simulated countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to register email
    setTimeout(() => {
      setIsSubmitted(true);
      setEmail('');
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mx-auto">
        {/* Logo placeholder */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">SB</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">We're Still Building Something Amazing</h1>
        
        <p className="text-center text-gray-600 mb-8">
          Our team is working hard to bring you an exceptional experience. Sign up to be notified when we launch!
        </p>
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 rounded-full mb-2">
            <div className="h-2 bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="text-right text-sm text-gray-600">65% Complete</div>
        </div>
        
        {/* Countdown timer */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {Object.entries(countdown).map(([unit, value]) => (
            <div key={unit} className="bg-gray-100 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{value}</div>
              <div className="text-xs text-gray-500 capitalize">{unit}</div>
            </div>
          ))}
        </div>
        
        {/* Email signup form */}
        <div className="mb-8">
          {isSubmitted ? (
            <div className="text-center p-4 bg-green-50 text-green-700 rounded-lg">
              <p>Thank you! We'll notify you when we launch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Notify Me
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Social media links */}
        <div className="flex justify-center gap-4 mb-6">
          {['Twitter', 'Instagram', 'LinkedIn'].map(platform => (
            <div key={platform} className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 cursor-pointer">
              <span className="text-gray-600 text-sm">{platform[0]}</span>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
