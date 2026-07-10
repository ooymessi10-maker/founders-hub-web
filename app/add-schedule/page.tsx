'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function AddSchedulePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('นัดซ้อม');
  const [hours, setHours] = useState('1'); // เพิ่มค่าชั่วโมงเริ่มต้น

  const handleSave = () => {
    const existingSchedules = JSON.parse(localStorage.getItem('teamSchedules') || '[]');
    const newSchedule = { title, date, time, type, hours: parseInt(hours) }; // เก็บค่า hours
    localStorage.setItem('teamSchedules', JSON.stringify([...existingSchedules, newSchedule]));
    router.push('/schedule');
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 font-sans">
      <Header />
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 space-y-4 mt-6">
        <h2 className="font-bold text-slate-800">เพิ่มกิจกรรม</h2>
        <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-slate-800" placeholder="ชื่องาน" onChange={(e) => setTitle(e.target.value)} />
        <input type="date" className="w-full p-3 rounded-xl border border-slate-200 text-slate-800" onChange={(e) => setDate(e.target.value)} />
        <input type="number" className="w-full p-3 rounded-xl border border-slate-200 text-slate-800" placeholder="จำนวนชั่วโมงที่ได้รับ" value={hours} onChange={(e) => setHours(e.target.value)} />
        <select className="w-full p-3 rounded-xl border border-slate-200 text-slate-800" onChange={(e) => setType(e.target.value)}>
          <option value="นัดซ้อม">นัดซ้อม</option>
          <option value="ประชุมทีม">ประชุมทีม</option>
          <option value="กิจกรรมสานสัมพันธ์">กิจกรรมสานสัมพันธ์</option>
        </select>
        <button onClick={handleSave} className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl">บันทึก</button>
      </div>
    </div>
  );
}