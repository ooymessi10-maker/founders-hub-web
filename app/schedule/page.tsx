'use client';
import { useState, useEffect } from 'react';
// import Link from 'next/link'; // ซ่อนไว้ก่อนถ้ายังไม่ได้ใช้
// import { Copy, MapPin, Clock } from 'lucide-react'; // ซ่อนไว้ก่อนถ้ายังไม่ได้ใช้
import Header from '../../components/Header';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  // สร้าง State สำหรับเก็บข้อมูลตารางใหม่ที่จะเพิ่ม
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newType, setNewType] = useState('ซ้อม');

  useEffect(() => {
    setSchedules(JSON.parse(localStorage.getItem('teamSchedules') || '[]'));
    setPlayers(JSON.parse(localStorage.getItem('teamPlayers') || '[]'));
  }, []);

  // ฟังก์ชันสำหรับเพิ่มตารางใหม่
  const addSchedule = () => {
    if (!newTitle || !newDate || !newTime) return alert('กรุณากรอกข้อมูลให้ครบก่อนครับ');
    
    const newSchedule = {
      title: newTitle,
      date: newDate,
      time: newTime,
      type: newType,
      attendance: []
    };
    
    const updatedSchedules = [...schedules, newSchedule];
    setSchedules(updatedSchedules);
    localStorage.setItem('teamSchedules', JSON.stringify(updatedSchedules));
    
    // เคลียร์ค่าในช่องกรอกหลังจากกดบันทึก
    setNewTitle('');
    setNewDate('');
    setNewTime('');
    alert('เพิ่มตารางสำเร็จ!');
  };

  const markAttendance = (index: number, status: string) => {
    if (!selectedPlayer) return alert('เลือกชื่อก่อนครับ');
    const newSchedules = [...schedules];
    if (!newSchedules[index].attendance) newSchedules[index].attendance = [];
    const idx = newSchedules[index].attendance.findIndex((a: any) => a.name === selectedPlayer);
    if (idx > -1) newSchedules[index].attendance[idx].status = status;
    else newSchedules[index].attendance.push({ name: selectedPlayer, status });
    setSchedules(newSchedules);
    localStorage.setItem('teamSchedules', JSON.stringify(newSchedules));
  };

  const checkIn = (index: number) => {
    if (!selectedPlayer) return alert('เลือกชื่อก่อนครับ');
    const newSchedules = [...schedules];
    if (!newSchedules[index].attendance) newSchedules[index].attendance = [];
    
    const playerIdx = newSchedules[index].attendance.findIndex((a: any) => a.name === selectedPlayer);
    if (playerIdx === -1) return alert('กรุณากด "ไป" ก่อนเช็คอินถึงสนามครับ');

    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    
    // เทียบเวลา (สายคือถ้ามาช้ากว่าเวลานัด)
    const isLate = timeString > newSchedules[index].time;
    
    newSchedules[index].attendance[playerIdx].checkInTime = timeString;
    newSchedules[index].attendance[playerIdx].status = isLate ? 'สาย' : 'มาถึงแล้ว';
    
    setSchedules(newSchedules);
    localStorage.setItem('teamSchedules', JSON.stringify(newSchedules));
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-20 font-sans">
      <Header />
      <div className="p-6">
        
        {/* ส่วนเพิ่มตารางนัดหมายใหม่ */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">➕ สร้างตารางใหม่</h2>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="ชื่อนัดหมาย (เช่น ซ้อมประจำสัปดาห์)" 
              className="w-full p-3 rounded-xl border border-pink-200 bg-pink-50/50"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <div className="flex gap-3">
              <input 
                type="date" 
                className="w-1/2 p-3 rounded-xl border border-pink-200 bg-pink-50/50"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
              <input 
                type="time" 
                className="w-1/2 p-3 rounded-xl border border-pink-200 bg-pink-50/50"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
            <select 
              className="w-full p-3 rounded-xl border border-pink-200 bg-pink-50/50"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            >
              <option value="ซ้อม">ซ้อม</option>
              <option value="แข่ง">แข่ง</option>
              <option value="ประชุม">ประชุมทีม</option>
            </select>
            <button 
              onClick={addSchedule}
              className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl mt-2 hover:bg-pink-600 transition"
            >
              บันทึกตาราง
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4">ตารางกิจกรรมของทีม</h2>
        <select className="w-full p-4 mb-6 rounded-xl border border-pink-200 bg-white" onChange={(e) => setSelectedPlayer(e.target.value)}>
          <option value="">👤 เลือกชื่อของคุณเพื่อเช็คชื่อ</option>
          {players.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
        </select>

        <div className="space-y-6">
          {schedules.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-1 rounded">{item.type}</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">วันที่ {item.date} เวลา {item.time} น.</p>
              
              <div className="flex gap-2 mb-4">
                <button onClick={() => markAttendance(index, 'ไป')} className="flex-1 bg-green-500 text-white py-2 rounded-xl text-sm font-bold">แจ้งว่า ไป</button>
                <button onClick={() => checkIn(index)} className="flex-1 bg-blue-500 text-white py-2 rounded-xl text-sm font-bold">เช็คอินถึงสนาม</button>
              </div>

              <div className="border-t pt-3">
                {item.attendance?.map((a: any, i: number) => (
                  <div key={i} className="flex justify-between text-xs py-1">
                    <span className="font-bold">{a.name}</span>
                    <span className={`px-2 rounded ${a.status === 'สาย' ? 'bg-orange-100 text-orange-600' : 'text-slate-500'}`}>
                      {a.status} {a.checkInTime && `(${a.checkInTime})`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {schedules.length === 0 && (
            <p className="text-center text-slate-500 text-sm mt-8">ยังไม่มีตารางกิจกรรมครับ</p>
          )}
        </div>
      </div>
    </div>
  );
}