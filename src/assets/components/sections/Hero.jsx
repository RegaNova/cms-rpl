export default function Hero() {
  return (
    <section id="home" className="pt-32 bg-teal-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Sinergi Pendidikan <span className="text-teal-600">Vokasi</span> dan
            <span className="text-teal-600"> Akademik</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Kolaborasi institusi pendidikan negeri dalam mencetak lulusan
            unggul, siap kerja, dan berdaya saing global.
          </p>
          <button className="mt-8 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold shadow">
            Jelajahi Program
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
          alt="Pendidikan"
          className="rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}