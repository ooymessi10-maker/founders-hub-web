import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col justify-center p-6 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-pink-100 max-w-sm w-full mx-auto">
        <h1 className="text-2xl font-bold text-pink-600 mb-2">เข้าสู่ระบบ</h1>
        <p className="text-slate-500 mb-8">ยินดีต้อนรับกลับสู่ Founders Hub</p>
        
        <div className="space-y-4">
          <input type="email" placeholder="อีเมล" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500" />
          <input type="password" placeholder="รหัสผ่าน" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500" />
          
          <Link href="/dashboard" className="block text-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors">
            เข้าสู่ระบบ
          </Link>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          ยังไม่มีบัญชี? <Link href="/register" className="text-pink-600 font-bold">สมัครสมาชิก</Link>
        </div>
      </div>
    </div>
  );
}