'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const API_URL = 'https://api.sheety.co/c49b688b76bfd05a6483628aab690ffa/foundersData/schedules';

  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newType, setNewType] = useState('ซ้อม');

  const fetchSchedules = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setSchedules(data.schedules || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // ฟังก์ชันแปลงวันที่ให้เป็น วัน/เดือน/ปี
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const addSchedule = async () => {
    if (!newTitle || !newDate || !newTime) return alert('กรุณากรอกข้อมูลให้ครบครับ');
    
    const body = { schedules: { title: newTitle, date: newDate, time: newTime, type: newType } };

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      alert('บันทึกตารางเรียบร้อยครับ!');
      setNewTitle('');
      fetchSchedules();
    } catch (error) {
      alert('บันทึกข้อมูลไม่สำเร็จครับ');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-20 font-sans">
      <Header />
      <div className="p-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">➕ สร้างตารางใหม่</h2>
          <div className="space-y-3">
            <input type="text" placeholder="ชื่อนัดหมาย" className="w-full p-3 rounded-xl border border-pink-200" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <div className="flex gap-3">
              <input type="date" className="w-1/2 p-3 rounded-xl border border-pink-200" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
              <input type="time" className="w-1/2 p-3 rounded-xl border border-pink-200" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
            </div>
            <select className="w-full p-3 rounded-xl border border-pink-200" value={newType} onChange={(e) => setNewType(e.target.value)}>
              <option value="ซ้อม">ซ้อม</option>
              <option value="แข่ง">แข่ง</option>
            </select>
            <button onClick={addSchedule} className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl">บันทึกตาราง</button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4">ตารางกิจกรรมทีม</h2>
        <div className="space-y-6">
          {schedules.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100">
              <h3 className="font-bold text-slate-800">{item.title}</h3>
              <p className="text-xs text-slate-500">
                วันที่ {formatDate(item.date)} เวลา {item.time} น. | {item.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}