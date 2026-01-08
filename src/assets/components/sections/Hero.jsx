export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/images/view-4.png')",
      }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
           lorem ipsum dolor sit amet
          </h1>
          <p className="mt-6 text-lg max-w-2xl text-white/90">
           Lorem ipsum dolor sit, amet consectetur adipisicing.
           Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </section>
  );
}
