import { BookOpen, Users, Star } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Keunggulan Kami
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <Feature
            icon={<BookOpen className="text-teal-600" />}
            title="Kurikulum Terapan"
            desc="Berbasis kebutuhan industri dan riset nasional."
          />
          <Feature
            icon={<Users className="text-teal-600" />}
            title="Dosen & Praktisi"
            desc="Didukung tenaga pendidik profesional dan berpengalaman."
          />
          <Feature
            icon={<Star className="text-teal-600" />}
            title="Lingkungan Akademik"
            desc="Kampus aman, inklusif, dan berorientasi masa depan."
          />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="p-6 bg-teal-50 rounded-xl hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}
