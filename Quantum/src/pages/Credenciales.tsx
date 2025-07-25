import React, { useState } from "react";
import Particulas from "../components/MouseParticles";
const credencialesPDF = `${import.meta.env.BASE_URL}CREDENCIALES_QUANTUM_M&S_1.pdf`;

const Credenciales: React.FC = () => {
    const slides = Array.from({ length: 18 }, (_, i) =>
        `/Credenciales/Credencial-${String(i + 1).padStart(2, "0")}.webp`
    );

    const [index, setIndex] = useState(0);
    const [downloading, setDownloading] = useState(false);
    const handleDownload = () => {
        setDownloading(true);
        setTimeout(() => setDownloading(false), 2000);
    };
    const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
    const next = () => setIndex((i) => (i + 1) % slides.length);
    const translateX = -index * 100;

    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-10 font-subjectivity text-white md:pt-30">
            <Particulas />

            {/* Slider Container */}
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-5xl xl:max-w-7xl overflow-hidden mb-8">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(${translateX}%)` }}
                >
                    {slides.map((src, i) => (
                        <div key={i} className="flex-none w-full">
                            <img
                                src={src}
                                alt={`Credencial ${i + 1}`}
                                className="w-full h-auto object-contain"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prev}
                    aria-label="Anterior"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={next}
                    aria-label="Siguiente"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Download Button - using <a> for direct download */}
            <a
                href={credencialesPDF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownload}
                download="CREDENCIALES_QUANTUM_M&S.pdf"
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 no-underline"
                role="button"
                aria-label="Descargar archivo PDF de credenciales"
            >
                {downloading ? (
                    <svg
                        className="w-6 h-6 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            strokeWidth={4}
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                )}
                {downloading ? "Descargando..." : "Descargar Credenciales PDF"}

            </a>
        </main>
    );
};

export default Credenciales;