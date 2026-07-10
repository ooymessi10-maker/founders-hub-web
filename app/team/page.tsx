'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Phone } from 'lucide-react';
import Header from '../../components/Header';

export default function TeamPage() {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem('teamPlayers') || '[]'));
  }, []);

  const deletePlayer = (indexToDelete: number) => {
    if (confirm('ลบรายชื่อนี้ใช่ไหม?')) {
      const updatedPlayers = players.filter((_, index) => index !== indexToDelete);
      setPlayers(updatedPlayers);
      localStorage.setItem('teamPlayers', JSON.stringify(updatedPlayers));
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-20 font-sans">
      <Header />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800">รายชื่อนักกีฬา</h2>
          <Link href="/add-player" className="bg-pink-500 text-white px-4 py-2 rounded-lg font-bold text-sm">+ เพิ่ม</Link>
        </div>

        <div className="space-y-3">
          {players.map((player, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-pink-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  {player.image ? (
                    <img src={player.image} alt={player.name} className="w-12 h-12 rounded-full object-cover border border-pink-200" />
                  ) : (
                    <div className="bg-pink-100 text-pink-700 font-bold w-12 h-12 flex items-center justify-center rounded-full text-sm">
                      {player.number}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-slate-800">{player.name}</h3>
                    <p className="text-xs text-slate-500">{player.position} - {player.subPosition}</p>
                  </div>
                </div>
                <button onClick={() => deletePlayer(index)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
              </div>
              
              {(player.phone || player.notes) && (
                <div className="mt-3 pt-3 border-t border-slate-50 text-xs text-slate-600 space-y-1">
                  {player.phone && <p className="flex items-center gap-1 text-blue-600"><Phone size={12} /> {player.phone}</p>}
                  {player.notes && <p className="text-slate-400 italic">หมายเหตุ: {player.notes}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}