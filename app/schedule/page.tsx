'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Copy, MapPin, Clock } from 'lucide-react';
import Header from '../../components/Header';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  useEffect(() => {
    setSchedules(JSON.parse(localStorage.getItem('teamSchedules') || '[]'));
    setPlayers(JSON.parse(localStorage.getItem('teamPlayers') || '[]'));
  }, []);

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
    const newSchedules = [...schedules];
    const playerIdx = newSchedules[index].attendance.findIndex((a: any) => a.name === selectedPlayer);
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
        <h2 className="text-xl font-bold text-slate-800 mb-6">ตารางกิจกรรม</h2>
        <select className="w-full p-4 mb-6 rounded-xl border border-pink-200 bg-white" onChange={(e) => setSelectedPlayer(e.target.value)}>
          <option value="">👤 เลือกชื่อของคุณ</option>
          {players.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
        </select>

        <div className="space-y-6">
          {schedules.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-1 rounded">{item.type}</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">{item.date} เวลา {item.time} น.</p>
              
              <div className="flex gap-2 mb-4">
                <button onClick={() => markAttendance(index, 'ไป')} className="flex-1 bg-green-500 text-white py-2 rounded-xl text-sm font-bold">ไป</button>
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
        </div>
      </div>
    </div>
  );
}