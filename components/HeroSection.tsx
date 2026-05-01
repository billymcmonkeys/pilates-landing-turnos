import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      aria-label="Bienvenida — Mundo Pilates"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=85"
        alt="Estudio de Pilates Reformer — Mundo Pilates"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient overlay — decorative */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-900/75 via-sage-800/60 to-sage-700/40" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-sage-200 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
          Pilates Reformer &amp; Mat · Buenos Aires
        </span>

        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Transforma tu cuerpo,
          <br />
          <span className="text-sage-200">transforma tu vida</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/85 mb-10 leading-relaxed max-w-2xl mx-auto">
          Clases reducidas de Pilates Reformer y Mat con instructoras certificadas.
          Máximo 8 camillas por turno para una atención verdaderamente personalizada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#turnos"
            aria-label="Ver turnos disponibles para reservar una clase de Pilates"
            className="inline-flex items-center justify-center px-8 py-4 bg-sage-500 hover:bg-sage-600 text-white font-semibold rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Ver turnos disponibles
          </a>
          <a
            href="#quienes-somos"
            aria-label="Conocer más sobre el estudio Mundo Pilates"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-full text-lg border border-white/30 transition-all duration-200 backdrop-blur-sm"
          >
            Conocer el estudio
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "+500", label: "Alumnas activas" },
            { value: "8", label: "Camillas por clase" },
            { value: "10+", label: "Años de experiencia" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — decorative */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
