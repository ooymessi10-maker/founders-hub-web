'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'founders2026') { 
      router.push('/add-player');
    } else {
      alert('รหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6 relative">
      
      {/* ปุ่มย้อนกลับวางไว้มุมซ้ายบน */}
      <button 
        onClick={() => router.back()} 
        className="absolute top-6 left-6 text-slate-500 font-medium hover:text-pink-600 transition-colors"
      >
        ← ย้อนกลับ
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-pink-600 text-center">สำหรับโค้ชเท่านั้น</h1>
        <input 
          type="password" 
          placeholder="ใส่รหัสผ่านลับ" 
          className="w-full p-3 border rounded-xl"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          onClick={handleLogin}
          className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}