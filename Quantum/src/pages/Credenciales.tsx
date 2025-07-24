import React, { useState } from "react";
import Particulas from "../components/MouseParticles";

const Credenciales: React.FC = () => {
    const slides = Array.from({ length: 18 }, (_, i) =>
        `/Credenciales/Credencial-${String(i + 1).padStart(2, "0")}.webp`
    );
    const [index, setIndex] = useState(0);

    const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
    const next = () => setIndex((i) => (i + 1) % slides.length);
    const translateX = -index * 100;

    return (
        <main className="flex items-center justify-center min-h-screen py-10 font-subjectivity text-white">
            <Particulas />
            <div
                className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl overflow-hidden">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(${translateX}%)` }}>
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

                <button
                    onClick={prev}
                    aria-label="Anterior"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={next}
                    aria-label="Siguiente"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
                >
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
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </main>
    );
};

export default Credenciales;