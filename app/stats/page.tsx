'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function StatsPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem('teamPlayers') || '[]'));
    setSchedules(JSON.parse(localStorage.getItem('teamSchedules') || '[]'));
  }, []);

  // ฟังก์ชันคำนวณชั่วโมง
  const calculateHours = (playerName: string) => {
    return schedules.reduce((total, sch) => {
      const isAttending = sch.attendance?.find((a: any) => a.name === playerName && a.status === 'ไป');
      return isAttending ? total + (sch.hours || 0) : total;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-20 font-sans">
      <Header />
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">สรุปชั่วโมงกิจกรรม (รายเดือน)</h2>
        <div className="space-y-3">
          {players.map((p, i) => {
            const total = calculateHours(p.name);
            const isTargetMet = total >= 10;
            return (
              <div key={i} className={`bg-white p-4 rounded-xl shadow-sm border ${isTargetMet ? 'border-green-300' : 'border-pink-100'} flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isTargetMet ? 'bg-green-500 text-white' : 'bg-pink-100 text-pink-700'}`}>
                    {total} ชม.
                  </div>
                  <span className="font-bold text-slate-800">{p.name}</span>
                </div>
                <span className={`text-xs font-bold ${isTargetMet ? 'text-green-600' : 'text-slate-400'}`}>
                  {isTargetMet ? 'ครบเป้าหมาย!' : `ยังขาดอีก ${10 - total} ชม.`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}