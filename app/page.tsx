import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-pink-50 text-slate-800 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-pink-600 tracking-tight">Founders Hub</h1>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          แพลตฟอร์มจัดการทีมฟุตซอล
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 leading-tight">
          ยกระดับทีมของคุณด้วย <br className="hidden md:block" />
          <span className="text-pink-500">Founders Hub</span>
        </h2>
        <p className="text-slate-500 mb-10 max-w-md mx-auto">
          ระบบบริหารจัดการทีมฟุตซอลที่ครบจบในที่เดียว 
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/login" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-colors w-full sm:w-auto">
            เข้าสู่ระบบ
          </Link>
          <Link href="/register" className="bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-bold py-3.5 px-8 rounded-xl transition-colors w-full sm:w-auto">
            สมัครสมาชิก
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="px-6 py-16 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">ฟีเจอร์ที่ทีมคุณต้องการ</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-lg mb-2 text-pink-600">🏃‍♂️ จัดการนักกีฬา</h4>
            <p className="text-sm text-slate-500 leading-relaxed">เก็บข้อมูลลูกทีม เบอร์เสื้อ ตำแหน่ง และสถิติส่วนตัวได้อย่างเป็นระเบียบ</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-lg mb-2 text-pink-600">📅 ตารางซ้อม/แข่ง</h4>
            <p className="text-sm text-slate-500 leading-relaxed">นัดหมายวันเวลา สถานที่ แจ้งเตือนลูกทีม ไม่พลาดทุกแมตช์สำคัญ</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-lg mb-2 text-pink-600">📊 ดูสถิติ</h4>
            <p className="text-sm text-slate-500 leading-relaxed">วิเคราะห์ผลงานของทีมและการเข้าซ้อม เพื่อพัฒนาศักยภาพให้ดียิ่งขึ้น</p>
          </div>
        </div>
      </section>
    </div>
  );
}