export default function Stats() {
  return (
    <section id="stats" className="py-16 bg-teal-600 text-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
        <Stat value="2" label="Institusi Negeri" />
        <Stat value="50.000+" label="Mahasiswa Aktif" />
        <Stat value="100+" label="Program Studi" />
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-4xl font-bold">{value}</p>
      <p className="mt-2 text-teal-100">{label}</p>
    </div>
  );
}
