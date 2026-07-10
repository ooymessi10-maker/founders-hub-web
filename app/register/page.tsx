'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', number: '', phone: '' });

  const handleRegister = async () => {
    // นี่คือส่วนที่โค้ชต้องนำ URL ของ Google Script มาใส่ (เดี๋ยวผมสอนวิธีสร้าง)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxQRVONVbjpTumWoj8wA61Ev_wgfP0RZQtiacLFITz3DMY-MLGRDYCXvbHZ86MZCLdhFQ/exec'

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      alert('ลงทะเบียนสำเร็จ! ข้อมูลเข้าตารางแล้วครับ');
      router.push('/');
    } catch (error) {
      alert('เกิดข้อผิดพลาด ลองใหม่อีกครั้งนะ');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex flex-col items-center">
      <h1 className="text-xl font-bold text-pink-600 mb-6">ลงทะเบียนนักกีฬา</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-4">
        <input className="w-full p-3 border rounded-xl" placeholder="ชื่อ-นามสกุล" onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input className="w-full p-3 border rounded-xl" placeholder="หมายเลขเสื้อ" onChange={(e) => setFormData({...formData, number: e.target.value})} />
        <input className="w-full p-3 border rounded-xl" placeholder="เบอร์โทรศัพท์" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        
        <button onClick={handleRegister} className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold">
          ยืนยันลงทะเบียน
        </button>
      </div>
    </div>
  );
}