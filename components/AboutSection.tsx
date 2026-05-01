import Image from "next/image";

const HIGHLIGHTS = [
  {
    icon: "🌿",
    title: "Ambiente boutique",
    description:
      "Un espacio íntimo y cuidado donde cada alumna tiene nombre, historia y objetivos propios.",
  },
  {
    icon: "🎯",
    title: "Instructoras certificadas",
    description:
      "Formadas en el método clásico y contemporáneo. Más de 10 años acompañando cuerpos en movimiento.",
  },
  {
    icon: "✨",
    title: "Método personalizado",
    description:
      "Adaptamos cada clase a tu nivel, lesiones y objetivos. Sin planillas genéricas, sin alumnos invisibles.",
  },
];

export default function AboutSection() {
  return (
    <section id="quienes-somos" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-sage-500 font-semibold text-sm tracking-widest uppercase"
            aria-hidden="true"
          >
            Quiénes Somos
          </span>
          <h2 className="section-title mt-3 mb-4">
            Un estudio que te ve como persona
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Mundo Pilates nació con una convicción: el movimiento consciente cambia vidas.
            Desde 2014, acompañamos a cientos de alumnas a descubrir su fuerza, su postura y su bienestar.
          </p>
        </div>

        {/* Image + text layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
                alt="Clase de Pilates en Mundo Pilates"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            {/* Floating badge — decorative, info already in body copy */}
            <div
              className="absolute -bottom-6 -right-6 bg-sage-500 text-white rounded-2xl p-5 shadow-lg"
              aria-hidden="true"
            >
              <p className="font-serif text-4xl font-bold">10+</p>
              <p className="text-sage-100 text-sm mt-1">años formando<br />cuerpos fuertes</p>
            </div>
          </div>

          <div className="md:pl-6">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-800 mb-6">
              Más que un estudio, una comunidad
            </h3>
            <p className="text-stone-600 leading-relaxed mb-5">
              Somos un equipo de instructoras apasionadas por el Pilates y por el
              bienestar integral. Nos especializamos en grupos reducidos porque creemos que
              la atención personalizada no es un lujo, es la base del método.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              Trabajamos con alumnas de todos los niveles: desde quienes se acercan por
              primera vez hasta atletas que buscan complementar su entrenamiento. Cada
              cuerpo tiene su ritmo, y nosotras lo respetamos.
            </p>
            <a
              href="#turnos"
              className="btn-outline"
              aria-label="Reservá tu primera clase de Pilates"
            >
              Reservá tu primera clase
            </a>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 border border-sage-100"
            >
              <span className="text-4xl mb-4 block" aria-hidden="true">{item.icon}</span>
              <h3 className="font-serif text-xl font-bold text-stone-800 mb-3">
                {item.title}
              </h3>
              <p className="text-stone-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
