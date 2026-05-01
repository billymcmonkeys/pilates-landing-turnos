import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PilatesSection from "@/components/PilatesSection";
import BookingSection from "@/components/BookingSection";

export default function Home() {
  return (
    <main id="main-content">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <PilatesSection />
      <BookingSection />
      <footer aria-label="Pie de página" className="bg-sage-900 text-sage-200 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-xl text-white">Mundo Pilates</p>
          {/* text-sage-300 on sage-900 = 6.07:1 — passes WCAG AA for small text */}
          <p className="text-sm text-sage-300">
            © {new Date().getFullYear()} Mundo Pilates · Buenos Aires, Argentina
          </p>
          <p className="text-sm italic text-sage-200">
            Tu bienestar comienza aquí.
          </p>
        </div>
      </footer>
    </main>
  );
}
