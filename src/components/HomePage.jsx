export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-52px)] flex-col items-center justify-center px-4 py-12 sm:py-16">

      {/* Trường & Khoa */}
      <p className="text-center text-sm font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200 sm:text-base">
        HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
      </p>
      <p className="mt-1 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
        KHOA CÔNG NGHỆ THÔNG TIN
      </p>

      {/* Môn học */}
      <p className="mt-3 text-sm font-bold text-sky-700 dark:text-sky-400">
        Môn học: IoT VÀ ỨNG DỤNG
      </p>

      {/* Logo */}
      <img
        src="/Logo_PTIT_University.png"
        alt="Logo PTIT"
        className="my-6 h-32 w-32 object-contain sm:h-40 sm:w-40"
      />

      {/* Tiêu đề chính */}
      <div className="my-10 text-center sm:my-14">
        <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          BÁO CÁO THỰC NGHIỆM
        </h1>
        <div className="mx-auto my-5 h-1 w-20 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" />
        <p className="mx-auto max-w-lg text-lg font-bold leading-relaxed text-slate-800 dark:text-slate-100 sm:text-xl">
          Xây dựng ứng dụng IoT thu thập dữ liệu từ cảm biến bằng ESP32, Firebase và Web Dashboard
        </p>
      </div>

      {/* Giảng viên & Nhóm */}
      <div className="grid w-full max-w-xl gap-8 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Giảng viên hướng dẫn
          </p>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            TS. Nguyễn Đức Minh
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Nhóm thực hiện — Nhóm 5
          </p>
          <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex justify-between gap-4">
              <span>Nguyễn Phú Quí</span>
              <span className="tabular-nums text-slate-400 dark:text-slate-500">K24DTCN081</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Nguyễn Thanh Hải</span>
              <span className="tabular-nums text-slate-400 dark:text-slate-500">B21DCXX002</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Trương Thị Thúy Quỳnh</span>
              <span className="tabular-nums text-slate-400 dark:text-slate-500">B21DCXX003</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Vũ Đức Chiến</span>
              <span className="tabular-nums text-slate-400 dark:text-slate-500">B21DCXX004</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Thời gian */}
      <div className="mt-12 text-center">
        <div className="mx-auto mb-4 h-px w-28 bg-sky-500" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Hà Nội, 2026
        </p>
      </div>
    </div>
  )
}
