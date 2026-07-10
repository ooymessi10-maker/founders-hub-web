'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const API_URL = 'https://api.sheety.co/c49b688b76bfd05a6483628aab690ffa/foundersData/schedules';
  const [playerName, setPlayerName] = useState('');

  const fetchSchedules = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setSchedules(data.schedules || []);
    } catch (error) { console.error("Error:", error); }
  };

  useEffect(() => {
    fetchSchedules();
    setPlayerName(localStorage.getItem('savedPlayerName') || '');
  }, []);

  const handleAttendance = async (item: any, status: 'ไป' | 'ไม่ไป') => {
    if (!playerName.trim()) return alert('พิมพ์ชื่อก่อนครับ');
    
    // ตรงนี้สำคัญ: เราต้องใช้ item.id ในการอัปเดต
    const name = playerName.trim();
    let goingList = item.going ? item.going.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
    let notGoingList = item.notgoing ? item.notgoing.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

    if (status === 'ไป') {
      if (!goingList.includes(name)) goingList.push(name);
      notGoingList = notGoingList.filter((n: string) => n !== name);
    } else {
      if (!notGoingList.includes(name)) notGoingList.push(name);
      goingList = goingList.filter((n: string) => n !== name);
    }

    // ส่งคำสั่ง PUT เพื่ออัปเดตบรรทัดนั้นๆ โดยระบุ item.id
    await fetch(`${API_URL}/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        schedules: { going: goingList.join(', '), notgoing: notGoingList.join(', ') }
      })
    });
    fetchSchedules();
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-20 font-sans">
      <Header />
      <div className="p-6">
        <input className="w-full p-4 mb-6 rounded-xl border" placeholder="ชื่อของคุณ" value={playerName} onChange={(e) => { setPlayerName(e.target.value); localStorage.setItem('savedPlayerName', e.target.value); }} />
        <div className="space-y-6">
          {schedules.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow border">
              <h3 className="font-bold">{item.title}</h3>
              <div className="flex gap-2 my-4">
                <button onClick={() => handleAttendance(item, 'ไป')} className="flex-1 bg-green-500 text-white py-2 rounded-xl">ไป</button>
                <button onClick={() => handleAttendance(item, 'ไม่ไป')} className="flex-1 bg-red-500 text-white py-2 rounded-xl">ไม่ไป</button>
              </div>
              <p className="text-xs">ไป: {item.going}</p>
              <p className="text-xs">ไม่ไป: {item.notgoing}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}