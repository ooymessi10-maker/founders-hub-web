'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    setResults(JSON.parse(localStorage.getItem('teamVotes') || '[]'));
  }, []);

  const getCount = (name: string, type: string) => {
    return results.filter(v => v.target === name && v.type === type).length;
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <Header />
      <h2 className="text-xl font-bold text-slate-800 mb-6 mt-4">สรุปคะแนนโหวต (สำหรับโค้ชเท่านั้น)</h2>
      <div className="space-y-4">
        {Array.from(new Set(results.map(v => v.target))).map((name: any, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm flex justify-between">
            <span className="font-bold text-slate-800">{name}</span>
            <div className="flex gap-4">
              <span className="text-green-600 font-bold">ซ้อม: {getCount(name, 'ซ้อม')}</span>
              <span className="text-blue-600 font-bold">ประชุม: {getCount(name, 'ประชุม')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}