'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function VotePage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedVoter, setSelectedVoter] = useState('');
  const [targetPlayer, setTargetPlayer] = useState('');
  const [voteType, setVoteType] = useState('ซ้อม');

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem('teamPlayers') || '[]'));
  }, []);

  const handleVote = () => {
    if (!selectedVoter || !targetPlayer) return alert('กรุณาเลือกชื่อผู้โหวตและผู้รับโหวต');
    
    const votes = JSON.parse(localStorage.getItem('teamVotes') || '[]');
    const now = new Date();
    const currentWeek = now.getWeek(); // ฟังก์ชันช่วยเช็คสัปดาห์
    const currentMonth = now.getMonth();

    // เช็คโควต้า
    const userVotes = votes.filter((v: any) => v.voter === selectedVoter && v.type === voteType);
    
    if (voteType === 'ซ้อม') {
      const thisWeekVotes = userVotes.filter((v: any) => new Date(v.date).getWeek() === currentWeek);
      if (thisWeekVotes.length >= 1) return alert('สัปดาห์นี้คุณโหวตซ้อมไปแล้วครับ');
    } else {
      const thisMonthVotes = userVotes.filter((v: any) => new Date(v.date).getMonth() === currentMonth);
      if (thisMonthVotes.length >= 2) return alert('เดือนนี้คุณโหวตประชุมครบ 2 ครั้งแล้วครับ');
    }
    
    const newVote = { voter: selectedVoter, target: targetPlayer, type: voteType, date: now.toISOString() };
    localStorage.setItem('teamVotes', JSON.stringify([...votes, newVote]));
    alert('ส่งโหวตสำเร็จ!');
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-20 p-6">
      <Header />
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 space-y-4 mt-6">
        <h2 className="font-bold text-slate-800 text-lg">โหวตเพื่อนร่วมทีม</h2>
        <select className="w-full p-3 rounded-xl border" onChange={(e) => setSelectedVoter(e.target.value)}>
          <option value="">👤 ผู้โหวต</option>
          {players.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
        </select>
        <select className="w-full p-3 rounded-xl border" onChange={(e) => setVoteType(e.target.value)}>
          <option value="ซ้อม">ความตั้งใจซ้อม (1 ครั้ง/สัปดาห์)</option>
          <option value="ประชุม">การเข้าประชุม (2 ครั้ง/เดือน)</option>
        </select>
        <select className="w-full p-3 rounded-xl border" onChange={(e) => setTargetPlayer(e.target.value)}>
          <option value="">🏆 เลือกเพื่อน</option>
          {players.filter(p => p.name !== selectedVoter).map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
        </select>
        <button onClick={handleVote} className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl">ส่งคะแนนโหวต</button>
      </div>
    </div>
  );
}

// เสริมฟังก์ชันเช็คสัปดาห์ของปี
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};