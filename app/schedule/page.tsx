'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const API_URL = 'https://api.sheety.co/c49b688b76bfd05a6483628aab690ffa/foundersData/schedules';
  const [playerName, setPlayerName] = useState('');
  
  // State สำหรับฟอร์มเพิ่มข้อมูลใหม่
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newLoc, setNewLoc] = useState('');
  const [newType, setNewType] = useState('ซ้อม');

  useEffect(() => {
    setPlayerName(localStorage.getItem('savedPlayerName') || '');
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setSchedules(data.schedules || []);
  };

  // ฟังก์ชันเพิ่มตารางใหม่ลง Sheet
  const addSchedule = async () => {
    const body = { schedules: { title: newTitle, date: newDate, time: newTime, location: newLoc, type: newType, going: '', notgoing: '' } };
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    alert('บันทึกกิจกรรมเรียบร้อย!');
    fetchSchedules();
  };

  // ฟังก์ชันเช็คชื่อ
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
      
      {/* ส่วนตั้งชื่อ */}
      <input className="w-full p-4 mb-6 rounded-xl border" placeholder="พิมพ์ชื่อเล่นของคุณที่นี่..." value={playerName} onChange={(e) => { setPlayerName(e.target.value); localStorage.setItem('savedPlayerName', e.target.value); }} />

      {/* ฟอร์มสร้างนัดหมายใหม่ */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6">
        <h2 className="font-bold mb-3">➕ เพิ่มตารางซ้อม/แข่ง</h2>
        <input className="w-full p-2 mb-2 border rounded" placeholder="ชื่อกิจกรรม" onChange={(e) => setNewTitle(e.target.value)} />
        <div className="flex gap-2 mb-2">
            <input type="date" className="w-1/2 p-2 border rounded" onChange={(e) => setNewDate(e.target.value)} />
            <input type="time" className="w-1/2 p-2 border rounded" onChange={(e) => setNewTime(e.target.value)} />
        </div>
        <input className="w-full p-2 mb-2 border rounded" placeholder="สถานที่" onChange={(e) => setNewLoc(e.target.value)} />
        <select className="w-full p-2 mb-3 border rounded" onChange={(e) => setNewType(e.target.value)}>
            <option>ซ้อม</option><option>แข่ง</option>
        </select>
        <button onClick={addSchedule} className="w-full bg-pink-500 text-white py-2 rounded-xl font-bold">บันทึกตาราง</button>
      </div>

      {/* รายการนัดหมาย */}
      <div className="space-y-6">
        {schedules.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow border border-pink-100">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm">📅 {item.date} | ⏰ {item.time} | 📍 {item.location}</p>
            <div className="flex gap-2 my-4">
              <button onClick={() => handleAttendance(item, 'ไป')} className="flex-1 bg-green-500 text-white py-2 rounded-xl">ไป</button>
              <button onClick={() => handleAttendance(item, 'ไม่ไป')} className="flex-1 bg-red-500 text-white py-2 rounded-xl">ไม่ไป</button>
            </div>
            <p className="text-xs">✅ ไป: {item.going}</p>
            <p className="text-xs">❌ ไม่ไป: {item.notgoing}</p>
          </div>
        ))}
      </div>
    </div>
  );
}