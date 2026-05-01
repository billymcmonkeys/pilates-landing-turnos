"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Qué es el Pilates", href: "#pilates" },
  { label: "Turnos", href: "#turnos" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="max-w-6xl mx-auto px-6 flex items-center justify-between"
      >
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#inicio");
          }}
          aria-label="Mundo Pilates — ir al inicio"
          className={`font-serif text-2xl font-bold transition-colors ${
            scrolled ? "text-sage-700" : "text-white"
          }`}
        >
          Mundo Pilates
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`text-sm font-medium transition-colors hover:text-sage-600 ${
                  scrolled ? "text-stone-700" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#turnos"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#turnos");
          }}
          aria-label="Reservar un turno de Pilates"
          className={`hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            scrolled
              ? "bg-sage-500 text-white hover:bg-sage-600"
              : "bg-white/20 text-white border border-white/40 hover:bg-white hover:text-sage-700"
          }`}
        >
          Reservar turno
        </a>

        {/* Mobile burger */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-stone-700" : "text-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5 transition-transform" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current transition-transform" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-sage-100 px-6 py-4 shadow-lg">
          <ul className="flex flex-col gap-4 mb-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="block text-stone-700 font-medium hover:text-sage-600 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#turnos"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#turnos");
            }}
            className="btn-primary w-full text-center"
          >
            Reservar turno
          </a>
        </div>
      )}
    </header>
  );
}
