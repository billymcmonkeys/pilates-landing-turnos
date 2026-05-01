import Image from "next/image";

const BENEFITS = [
  {
    title: "Fortalece el core",
    description:
      "Cada ejercicio parte del centro del cuerpo. En pocas semanas notás la diferencia en tu postura y en tu vida cotidiana.",
  },
  {
    title: "Mejora la postura",
    description:
      "El método trabaja la alineación vertebral desde adentro hacia afuera. Sin dolor de espalda, con más conciencia corporal.",
  },
  {
    title: "Flexibilidad sin forzar",
    description:
      "El Pilates alarga los músculos en lugar de acortarlos. Ganás movilidad real, sostenida en el tiempo.",
  },
  {
    title: "Reduce el estrés",
    description:
      "La respiración y la concentración propias del método tienen un efecto directo sobre el sistema nervioso. Una hora de Pilates es una hora para vos.",
  },
  {
    title: "Apto para todos",
    description:
      "Con lesiones, embarazo, postparto, sedentarismo o alto rendimiento: el Pilates se adapta. No al revés.",
  },
  {
    title: "Resultados visibles",
    description:
      "Más tono, mejor coordinación y mayor energía. Los cambios se sienten antes de verse, y cuando se ven, se quedan.",
  },
];

const GRID_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    alt: "Pilates Reformer — Mundo Pilates",
    className: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    alt: "Clase de stretching y flexibilidad",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    alt: "Ejercicio en colchoneta — Pilates Mat",
    className: "",
  },
];

export default function PilatesSection() {
  return (
    <section id="pilates" aria-labelledby="pilates-heading" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-sage-500 font-semibold text-sm tracking-widest uppercase"
            aria-hidden="true"
          >
            Qué es el Pilates
          </span>
          <h2 id="pilates-heading" className="section-title mt-3 mb-4">
            Un método, miles de transformaciones
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Creado por Joseph Pilates a principios del siglo XX, el método trabaja la
            fuerza, la flexibilidad y el control corporal desde la raíz. No es gimnasia.
            Es otra forma de habitar el cuerpo.
          </p>
        </div>

        {/* Image grid + intro text split */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4 h-[480px]">
            <div className="relative rounded-2xl overflow-hidden row-span-2 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
                alt="Pilates Reformer — equipo del estudio"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80"
                alt="Flexibilidad y respiración en Pilates"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"
                alt="Pilates Mat — ejercicio en colchoneta"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-800 mb-6">
              Fuerza desde el centro, movimiento desde la conciencia
            </h3>
            <p className="text-stone-600 leading-relaxed mb-5">
              El Pilates trabaja el cuerpo como una unidad. A diferencia del gimnasio
              convencional, no aísla músculos: los integra. El resultado es un cuerpo más
              eficiente, equilibrado y menos propenso a lesiones.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              En Mundo Pilates ofrecemos clases de <strong>Reformer</strong> —con máquina,
              para resistencia y amplitud de movimiento— y de <strong>Mat</strong> —en
              colchoneta, más accesible y también increíblemente desafiante.
            </p>
            <div className="flex gap-4 flex-wrap">
              <span className="px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-sm font-medium border border-sage-200">
                Pilates Reformer
              </span>
              <span className="px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-sm font-medium border border-sage-200">
                Pilates Mat
              </span>
              <span className="px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-sm font-medium border border-sage-200">
                Todos los niveles
              </span>
            </div>
          </div>
        </div>

        {/* Benefit cards */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-stone-800 text-center mb-10">
            ¿Qué ganás practicando Pilates?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => (
              <div
                key={benefit.title}
                className="group p-6 rounded-2xl border border-sage-100 hover:border-sage-300 hover:bg-sage-50 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-sage-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <h4 className="font-semibold text-stone-800">{benefit.title}</h4>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
