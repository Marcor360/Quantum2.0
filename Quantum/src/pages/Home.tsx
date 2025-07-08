import React, { useState, useEffect } from 'react';
import CompGif from '/Comp.gif';
import serviciosImg from '/Servicios-Web.webp';
import brandingImg from '/Branding_Web.webp';
import campanasImg from '/Campañas_Web.webp';
import ecommerceImg from '/Eomerce_Web.webp';
import appsIaImg from '/Apps_IA_Web.webp';


interface Slide {
    title: string;
    imgUrl: string;
    heading?: string;
    text?: string;
}

const slides: Slide[] = [
    {
        title: '',
        imgUrl: serviciosImg,
        heading: '¿Quieres redefinir tu propuesta de valor?',
        text: 'Redefine tu propuesta de valor, te ayudamos a desarrollar nuevos canales de venta y maneras de comunicar con un nuevo segmento de clientes.',
    },
    {
        title: '',
        imgUrl: brandingImg,
        heading: '¿Buscas una identidad poderosa?',
        text: 'Genera para tu producto o servicio un ADN estratégico para lograr una identidad poderosa. Construimos sistemas de valor que elevan reconocimiento, fidelizan audiencias y generan ventas.',
    },
    {
        title: '',
        imgUrl: campanasImg,
        heading: '¿Ya tienes la estrategia?',
        text: 'Nosotros te ayudamos a materializarla desarrollando desde el storytelling creativo hasta la compra de medios y analítica para convertir audiencias en clientes.',
    },
    {
        title: '',
        imgUrl: ecommerceImg,
        heading: '¿Listo para vender en los principales marketplaces?',
        text: 'Desarrollamos la estrategia y lanzamos tus productos o servicios en los principales marketplaces (Amazon y Mercado Libre) ayudándote a gestionar el total del proceso para asegurar el éxito en el mundo electrónico.',
    },
    {
        title: '',
        imgUrl: appsIaImg,
        heading: '¿Deseas optimizar tu operación con tecnología?',
        text: 'Hoy gestionas tu negocio de manera manual, te ayudamos a automatizar y transformar la manera en que gestionas tu operación. Desarrollamos herramientas digitales y APPs a la medida de tus necesidades.',
    },
];

export const Home: React.FC = () => {
    // Textos del hero
    const firstText = 'Estrategia de Marketing & Ventas para el mundo REAL…';
    const secondText =
        'Exponenciamos tus ingresos TRANSFORMANDO la manera en que tu negocio hace negocio.';

    // Máquina de escribir
    const [typed, setTyped] = useState('');
    const [showSecond, setShowSecond] = useState(false);

    // Cursor parpadeante
    const [cursorVisible, setCursorVisible] = useState(true);
    useEffect(() => {
        const blink = setInterval(() => setCursorVisible(v => !v), 500);
        return () => clearInterval(blink);
    }, []);

    // Efecto typing
    useEffect(() => {
        if (typed.length < firstText.length) {
            const to = setTimeout(() => setTyped(firstText.slice(0, typed.length + 1)), 100);
            return () => clearTimeout(to);
        } else {
            const to2 = setTimeout(() => setShowSecond(true), 300);
            return () => clearTimeout(to2);
        }
    }, [typed]);

    return (
        <div className="flex flex-col w-full h-screen">
            {/* === HERO TEXT === */}
            <section className="w-full py-16 flex flex-col items-center ">
                <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
                    {typed}
                    {typed.length < firstText.length && (
                        <span className="inline-block ml-1">
                            {cursorVisible ? '|' : ' '}
                        </span>
                    )}
                </h1>
                {showSecond && (
                    <p className="mt-4 text-lg md:text-2xl text-white text-center max-w-2xl">
                        {secondText}
                    </p>
                )}
            </section>

            {/* === SLIDER PRINCIPAL === */}
            <div className="overflow-auto pb-4 md:overflow-hidden md:h-full md:pb-0">
                {/* MÓVIL / TABLET */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4 p-4">
                    {slides.map((slide, idx) => (
                        <div key={idx} className="relative rounded-lg overflow-hidden h-72 sm:h-80">
                            <img
                                src={slide.imgUrl}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0  bg-opacity-50 p-4 flex flex-col justify-between">
                                <div>
                                    {slide.heading && (
                                        <h2 className="text-sm sm:text-base font-bold mb-2 leading-snug text-white">
                                            {slide.heading}
                                        </h2>
                                    )}
                                    {slide.text && (
                                        <p className="text-xs sm:text-sm leading-relaxed text-white mb-2">
                                            {slide.text}
                                        </p>
                                    )}
                                </div>
                                <div className="uppercase font-extrabold text-sm sm:text-base text-white drop-shadow-lg tracking-widest">
                                    {slide.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ESCRITORIO */}
                <div className="hidden md:flex h-full w-full overflow-hidden group">
                    {slides.map((slide, idx) => (
                        <div
                            key={idx}
                            className="
                relative flex-1
                transition-all duration-500 ease-in-out
                 hover:flex-[5]
                cursor-pointer overflow-hidden h-[100%]
              "
                        >
                            <img
                                src={slide.imgUrl}
                                alt={slide.title}
                                className="
                  absolute inset-0 w-full h-full
                  object-cover object-[88%]
                  transition-all duration-500 ease-in-out
                "
                            />
                            {(slide.heading || slide.text) && (
                                <div className="
                  absolute inset-0
                  p-8 flex flex-col justify-center text-white
                  opacity-0 hover:opacity-100
                  transition-opacity duration-300
                ">
                                    <div className="max-w-[35%]">
                                        {slide.heading && (
                                            <h2 className="text-5xl font-bold mb-2 drop-shadow-lg pt-50">
                                                {slide.heading}
                                            </h2>
                                        )}
                                        {slide.text && (
                                            <p className="text-lg drop-shadow-lg text-justify">
                                                {slide.text}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="
                absolute bottom-4 left-6
                text-white uppercase
                transform -rotate-90 origin-bottom-left
                tracking-widest font-extrabold
                text-[6vw] sm:text-[8vw] md:text-[10vw] lg:text-[1.5vw]
                leading-none drop-shadow-lg whitespace-nowrap
              ">
                                {slide.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* === GIF DE BIENVENIDA === */}
            <div className="relative w-full h-1/3 md:h-1/2 lg:h-1/5 overflow-hidden">
                <img
                    src={CompGif}
                    alt="Animación de bienvenida"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-center object-cover"
                />
            </div>

        </div>
    );
};

export default Home;
