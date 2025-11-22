import React, { useState } from 'react';

export default function LoginForm({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState('phone');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(generatedOtp);
    setStep('otp');
    alert(`OTP sent to ${phone}. For demo, OTP is: ${generatedOtp}`);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === sentOtp) {
      const userData = { 
        phone, 
        name: name || 'User',
        email: email || '',
        loggedIn: true,
        photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || phone)}&background=blue&color=fff&size=128`
      };
      localStorage.setItem('scrap_deal_user', JSON.stringify(userData));
      onLoginSuccess();
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  if (step === 'phone') {
    return (
      <form onSubmit={handlePhoneSubmit} className="grid gap-4">
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${!isSignUp ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${isSignUp ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Sign Up
          </button>
        </div>
        {isSignUp && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required={isSignUp}
              className="w-full rounded-md border border-gray-300 p-2" 
            />
          </div>
        )}
        {isSignUp && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email <span className="text-gray-500 text-xs">(Optional)</span></label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-md border border-gray-300 p-2" 
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            required 
            className="w-full rounded-md border border-gray-300 p-2" 
          />
        </div>
        <button type="submit" className="w-full rounded-md bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700">Send OTP</button>
      </form>
    );
  }

  return (
    <form onSubmit={handleOtpSubmit} className="grid gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Enter OTP</label>
        <input 
          type="text" 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          maxLength="6"
          required 
          className="w-full rounded-md border border-gray-300 p-2 text-center text-2xl tracking-widest" 
        />
        <p className="mt-2 text-sm text-gray-600">OTP sent to {phone}</p>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => setStep('phone')} className="flex-1 rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50">Change Number</button>
        <button type="submit" className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700">Verify OTP</button>
      </div>
    </form>
  );
}
