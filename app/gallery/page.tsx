'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('teamGallery') || '[]'));
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 pb-20 font-sans">
      <Header />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">อัลบั้มกิจกรรม</h2>
          <Link href="/add-gallery" className="bg-pink-500 text-white px-4 py-2 rounded-lg font-bold text-sm">+ เพิ่มรูป/คลิป</Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div key={index} className="bg-white p-2 rounded-2xl shadow-sm border border-pink-100">
              <div className="aspect-video bg-slate-100 rounded-xl mb-2 overflow-hidden flex items-center justify-center">
                {item.type === 'รูป' ? <img src={item.url} className="object-cover w-full h-full" /> : <p className="text-xs text-slate-400">คลิป/ลิงก์</p>}
              </div>
              <p className="font-bold text-slate-800 text-sm px-1">{item.title}</p>
              <p className="text-[10px] text-slate-400 px-1">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}