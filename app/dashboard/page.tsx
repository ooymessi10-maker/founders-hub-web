'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function DashboardPage() {
  const [nextSchedule, setNextSchedule] = useState<any>(null);

  useEffect(() => {
    const schedules = JSON.parse(localStorage.getItem('teamSchedules') || '[]');
    if (schedules.length > 0) {
      setNextSchedule(schedules[0]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 pb-10">
      <Header />
      
      <div className="p-6 space-y-6">
        {/* สรุปนัดหมายถัดไป */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-pink-500">
          <h3 className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-1">นัดหมายถัดไป</h3>
          {nextSchedule ? (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">{nextSchedule.title}</h2>
              <p className="text-slate-500 text-sm">{nextSchedule.date} | {nextSchedule.time}</p>
            </div>
          ) : (
            <p className="text-slate-400">ยังไม่มีนัดหมายในขณะนี้</p>
          )}
        </div>

        {/* เมนูทางลัด 6 เมนูหลัก */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/team" className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 text-center hover:border-pink-300">
            <span className="block text-2xl mb-1">👥</span>
            <span className="text-xs font-bold text-slate-800">รายชื่อทีม</span>
          </Link>
          <Link href="/schedule" className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 text-center hover:border-pink-300">
            <span className="block text-2xl mb-1">📅</span>
            <span className="text-xs font-bold text-slate-800">ตารางซ้อม</span>
          </Link>
          <Link href="/stats" className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 text-center hover:border-pink-300">
            <span className="block text-2xl mb-1">🏆</span>
            <span className="text-xs font-bold text-slate-800">สรุปชม.</span>
          </Link>
          <Link href="/gallery" className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 text-center hover:border-pink-300">
            <span className="block text-2xl mb-1">📸</span>
            <span className="text-xs font-bold text-slate-800">อัลบั้ม</span>
          </Link>
          <Link href="/vote" className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 text-center hover:border-pink-300">
            <span className="block text-2xl mb-1">🗳️</span>
            <span className="text-xs font-bold text-slate-800">โหวตเพื่อน</span>
          </Link>
          <Link href="/results" className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 text-center hover:border-pink-300">
            <span className="block text-2xl mb-1">🔑</span>
            <span className="text-xs font-bold text-slate-800">ผลโหวต</span>
          </Link>
        </div>
      </div>
    </div>
  );
}