'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const API_URL = 'https://api.sheety.co/c49b688b76bfd05a6483628aab690ffa/foundersData/schedules';
  const [playerName, setPlayerName] = useState(localStorage.getItem('savedPlayerName') || '');

  const fetchSchedules = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setSchedules(data.schedules || []);
  };

  useEffect(() => { fetchSchedules(); }, []);

  const handleAttendance = async (item: any, status: 'ไป' | 'ไม่ไป') => {
    if (!playerName.trim()) return alert('ใส่ชื่อก่อนครับ');
    const name = playerName.trim();
    let going = item.going ? item.going.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
    let notGoing = item.notgoing ? item.notgoing.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

    if (status === 'ไป') { going.push(name); notGoing = notGoing.filter((n: string) => n !== name); }
    else { notGoing.push(name); going = going.filter((n: string) => n !== name); }

    await fetch(`${API_URL}/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schedules: { going: going.join(', '), notgoing: notGoing.join(', ') } })
    });
    fetchSchedules();
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-20 p-6">
      <Header />
      <input className="w-full p-4 mb-6 rounded-xl border" placeholder="ชื่อของคุณ" value={playerName} onChange={(e) => { setPlayerName(e.target.value); localStorage.setItem('savedPlayerName', e.target.value); }} />
      
      <div className="space-y-6">
        {schedules.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow border border-pink-100">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <div className="text-sm text-slate-600 mt-1 space-y-1">
              <p>📅 {item.date} | ⏰ {item.time}</p>
              <p>📍 {item.location}</p>
              <p>🎯 {item.type}</p>
            </div>
            <div className="flex gap-2 my-4">
              <button onClick={() => handleAttendance(item, 'ไป')} className="flex-1 bg-green-500 text-white py-2 rounded-xl font-bold">ไป</button>
              <button onClick={() => handleAttendance(item, 'ไม่ไป')} className="flex-1 bg-red-500 text-white py-2 rounded-xl font-bold">ไม่ไป</button>
            </div>
            <p className="text-xs text-emerald-600">✅ ไป ({item.going ? item.going.split(',').length : 0} คน): {item.going}</p>
            <p className="text-xs text-red-600 mt-1">❌ ไม่ไป: {item.notgoing}</p>
          </div>
        ))}
      </div>
    </div>
  );
}