// src/components/MouseParticles.tsx

import React, { useEffect, useRef } from "react";

////////////////////////////////////////////////////////////////////////////////
// 1) Definición de tipos
////////////////////////////////////////////////////////////////////////////////
/// Interfaz que describe las propiedades de cada partícula en el sistema.
interface Particle {
    x: number;    // Coordenada X (horizontal) actual de la partícula
    y: number;    // Coordenada Y (vertical) actual de la partícula
    vx: number;   // Velocidad horizontal actual (delta X por frame)
    vy: number;   // Velocidad vertical actual (delta Y por frame)
    size: number; // Radio del círculo que dibuja la partícula
}

////////////////////////////////////////////////////////////////////////////////
// 2) Componente React
////////////////////////////////////////////////////////////////////////////////
const MouseParticles: React.FC = () => {
    // Referencia al elemento <canvas> en el DOM
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Ref que guarda la posición del ratón; inicializado fuera de pantalla
    const mouse = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        // 2.1) Obtención de canvas y contexto
        const canvas = canvasRef.current;
        if (!canvas) return;                  // Si no existe el canvas, abortamos
        const ctx = canvas.getContext("2d");
        if (!ctx) return;                     // Si no hay contexto 2D, abortamos

        // 2.2) Adaptación de tamaño del canvas al contenedor
        const resize = () => {
            // Ajusta el tamaño de dibujo interno (width/height) al tamaño CSS
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();                             // Llamada inicial para ajuste inmediato
        window.addEventListener("resize", resize);  // Reajuste al cambiar ventana

        // 2.3) Generación inicial de partículas
        const particles: Particle[] = [];
        const PARTICLE_COUNT = 50;            // Número total de partículas
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                // Posición aleatoria dentro de las dimensiones actuales del canvas
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                // Velocidades pequeñas y aleatorias para movimiento lento
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                // Tamaño aleatorio entre 3px y 8px
                size: Math.random() * 5 + 3,
            });
        }

        // 2.4) Manejador de movimiento del ratón
        const onMouseMove = (e: MouseEvent) => {
            // Obtenemos la posición del canvas en la página
            const rect = canvas.getBoundingClientRect();
            // Calculamos la posición del ratón relativa al canvas
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };
        canvas.addEventListener("mousemove", onMouseMove);

        // 2.5) Bucle de animación
        let animationFrameId: number;
        const render = () => {
            // Limpia todo el canvas para el siguiente frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 2.5.1) Actualización de cada partícula
            for (const p of particles) {
                // a) Movimiento según su velocidad
                p.x += p.vx;
                p.y += p.vy;

                // b) Rebote en los bordes: invierte velocidad cuando sale del área
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // c) Repulsión al acercarse al ratón
                const dx = p.x - mouse.current.x;
                const dy = p.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const REPULSION_RADIUS = 80;        // Umbral de proximidad para repulsión
                const REPULSION_FORCE = 0.05;       // Intensidad de la fuerza
                if (dist < REPULSION_RADIUS) {
                    // Calcula el ángulo desde el ratón hacia la partícula
                    const angle = Math.atan2(dy, dx);
                    // Modifica la velocidad para alejarla del ratón
                    p.vx += Math.cos(angle) * REPULSION_FORCE;
                    p.vy += Math.sin(angle) * REPULSION_FORCE;
                }

                // d) Dibujado de la partícula como un círculo relleno
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,255,255,0.9)";  // Blanco semitransparente
                ctx.fill();
            }

            // 2.5.2) Conexión opcional: líneas entre partículas cercanas
            const CONNECTION_DISTANCE = 120;     // Máxima distancia para conectar
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DISTANCE) {
                        // Dibuja línea tenue entre las dos partículas
                        ctx.strokeStyle = "rgba(255,255,255,0.3)";
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Solicita el siguiente frame de animación recurivamente
            animationFrameId = requestAnimationFrame(render);
        };
        render(); // Inicia el bucle de animación

        // 2.6) Cleanup: se ejecuta al desmontar el componente
        return () => {
            cancelAnimationFrame(animationFrameId);      // Detiene la animación
            canvas.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", resize);
        };
    }, []); // Dependencias vacías: solo se ejecuta al montar

    // Renderiza el canvas cubriendo todo el contenedor padre
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default MouseParticles;
//Gracias a Mi mama, mi Pato, una cereza y a la IA por ayudarme a hacer esto posible.
//A Luis le Gusta Ana
//Luis si les esto, me devez un helado.
