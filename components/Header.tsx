'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  return (
    <header className="p-4 bg-white shadow-sm border-b border-pink-100 mb-6 flex items-center justify-between">
      {/* ปุ่มย้อนกลับ */}
      <button 
        onClick={() => router.back()} 
        className="p-2 text-slate-700 hover:bg-pink-50 hover:text-pink-600 rounded-full transition-colors"
      >
        <ArrowLeft size={24} />
      </button>
      
      {/* ชื่อทีม */}
      <h1 className="text-lg font-bold text-slate-800">
        เสี่ยงไทร์ FSC
      </h1>
      
      {/* ปุ่มกลับหน้าแรก */}
      <button 
        onClick={() => router.push('/dashboard')} 
        className="p-2 text-slate-700 hover:bg-pink-50 hover:text-pink-600 rounded-full transition-colors"
      >
        <Home size={24} />
      </button>
    </header>
  );
}