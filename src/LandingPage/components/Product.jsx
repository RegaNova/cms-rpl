import React from "react";

const products = [
  {
    id: 1,
    label: "SOLD",
    labelColor: "bg-green-500",
    title: "Landing Page",
    description:
      "Buat kesan pertama yang profesional! Landing Page modern dan responsif untuk promosikan produk atau eventmu dengan tampilan menarik dan cepat diakses di semua perangkat.",
    image: "/images/product1.jpg",
    buttons: ["DETAIL", "$ BUY"],
  },
  {
    id: 2,
    label: "LAUNCHED",
    labelColor: "bg-pink-500",
    title: "Company Profile",
    description:
      "Perkuat citra bisnismu dengan website Company Profile elegan. Tampilkan visi, layanan, dan keunggulan perusahaan secara menarik dan terpercaya di mata klien.",
    image: "/images/product2.jpg",
    buttons: ["DETAIL", "ACCESS"],
  },
  {
    id: 3,
    label: "SOLD",
    labelColor: "bg-green-500",
    title: "E-Commerce Website",
    description:
      "Bangun toko online profesional yang siap menjual 24 jam! Dilengkapi fitur katalog produk, keranjang, dan sistem checkout mudah untuk pengalaman belanja pelanggan yang menyenangkan.",
    image: "/images/product3.jpg",
    buttons: ["DETAIL", "$ BUY"],
  },
];

const Product = () => {
  return (
    <section className="bg-[#045e73] py-16 text-white text-center">
      <h2 className="text-2xl font-bold mb-10 tracking-wide">
        OUR PRODUCT LIST
      </h2>

      {/* Container Card */}
      <div className="flex flex-wrap justify-center gap-6 px-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white text-gray-800 rounded-xl overflow-hidden shadow-lg w-80 relative transition transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            {/* Gambar */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <span
                className={`absolute top-2 left-2 text-xs font-semibold text-white px-3 py-1 rounded ${item.labelColor}`}
              >
                {item.label}
              </span>
            </div>

            {/* Konten */}
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Tombol */}
              <div className="flex justify-center gap-3">
                {item.buttons.map((btn, i) => (
                  <button
                    key={i}
                    className="px-4 py-1.5 border border-[#045e73] rounded-md text-sm font-semibold hover:bg-[#045e73] hover:text-white transition"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol More Product */}
      <button className="mt-10 px-6 py-2 border border-white text-white rounded-md font-semibold hover:bg-white hover:text-[#045e73] transition">
        MORE PRODUCT
      </button>
    </section>
  );
};

export default Product;
