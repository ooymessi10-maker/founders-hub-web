'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function AddPlayerPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [position, setPosition] = useState('');
  const [subPosition, setSubPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');

  const getSubOptions = () => {
    if (position === 'แนวรุก') return ['กองหน้า', 'ริมเส้น', 'กองกลาง'];
    if (position === 'แนวรับ') return ['กองกลาง', 'กองหลัง'];
    if (position === 'ผู้รักษาประตู') return ['ผู้รักษาประตู'];
    return [];
  };

  const handleSave = () => {
    const existingData = JSON.parse(localStorage.getItem('teamPlayers') || '[]');
    const newPlayer = { name, number, position, subPosition, phone, notes, image };
    localStorage.setItem('teamPlayers', JSON.stringify([...existingData, newPlayer]));
    router.push('/team');
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-20 font-sans">
      <Header />
      <main className="px-6 pb-6 space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 space-y-3">
          <h2 className="font-bold text-slate-800 mb-2">เพิ่มข้อมูลนักกีฬา</h2>
          <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-slate-800" placeholder="ชื่อ-นามสกุล" onChange={(e) => setName(e.target.value)} />
          <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-slate-800" placeholder="ลิงก์รูปโปรไฟล์ (URL)" onChange={(e) => setImage(e.target.value)} />
          <input type="number" className="w-full p-3 rounded-xl border border-slate-200 text-slate-800" placeholder="หมายเลขเสื้อ" onChange={(e) => setNumber(e.target.value)} />
          
          <select className="w-full p-3 rounded-xl border border-slate-200 text-slate-800" onChange={(e) => { setPosition(e.target.value); setSubPosition(''); }}>
            <option value="">เลือกตำแหน่งหลัก</option>
            <option value="แนวรุก">แนวรุก</option>
            <option value="แนวรับ">แนวรับ</option>
            <option value="ผู้รักษาประตู">ผู้รักษาประตู</option>
          </select>

          {position && (
            <select className="w-full p-3 rounded-xl border border-pink-200 bg-pink-50 text-slate-800" onChange={(e) => setSubPosition(e.target.value)}>
              <option value="">เลือกตำแหน่งย่อย</option>
              {getSubOptions().map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          )}

          <input type="tel" className="w-full p-3 rounded-xl border border-slate-200 text-slate-800" placeholder="เบอร์โทรศัพท์" onChange={(e) => setPhone(e.target.value)} />
          <textarea className="w-full p-3 rounded-xl border border-slate-200 text-slate-800" placeholder="หมายเหตุ" rows={3} onChange={(e) => setNotes(e.target.value)} />

          <button onClick={handleSave} className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600">บันทึกข้อมูล</button>
        </div>
      </main>
    </div>
  );
}