'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function AddGalleryPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('รูป');

  const handleSave = () => {
    const data = JSON.parse(localStorage.getItem('teamGallery') || '[]');
    const newItem = { title, url, type, date: new Date().toLocaleDateString('th-TH') };
    localStorage.setItem('teamGallery', JSON.stringify([...data, newItem]));
    router.push('/gallery');
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 font-sans">
      <Header />
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 space-y-4 mt-6">
        <h2 className="font-bold text-slate-800">เพิ่มรูปหรือคลิป</h2>
        <input className="w-full p-3 rounded-xl border border-slate-200" placeholder="ชื่อกิจกรรม" onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full p-3 rounded-xl border border-slate-200" placeholder="วางลิงก์รูปหรือคลิป (URL)" onChange={(e) => setUrl(e.target.value)} />
        <select className="w-full p-3 rounded-xl border border-slate-200" onChange={(e) => setType(e.target.value)}>
          <option>รูป</option>
          <option>คลิป</option>
        </select>
        <button onClick={handleSave} className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl">บันทึกเข้าอัลบั้ม</button>
      </div>
    </div>
  );
}