// src/components/useInView.tsx
import { useEffect, useState, useRef } from "react";
import type { RefCallback } from "react";

interface UseInViewReturn<T extends HTMLElement> {
    /** Callback ref que pasas al elemento */
    ref: RefCallback<T>;
    /** `true` cuando el elemento está en pantalla */
    inView: boolean;
}

function useInView<T extends HTMLElement = HTMLDivElement>(
    options?: IntersectionObserverInit
): UseInViewReturn<T> {
    const [inView, setInView] = useState(false);

    // Inicializamos la ref del observer en null
    const observer = useRef<IntersectionObserver | null>(null);

    // Nodo actual al que apuntamos con la callback ref
    const [node, setNode] = useState<T | null>(null);

    useEffect(() => {
        // Si no hemos creado aún el observer, lo instanciamos con las opciones
        if (!observer.current) {
            observer.current = new IntersectionObserver(
                ([entry]) => setInView(entry.isIntersecting),
                options
            );
        }
        const obs = observer.current;

        // Si el nodo existe, lo observamos
        if (node) obs.observe(node);

        return () => {
            // Al desmontar o cambiar nodo, dejamos de observarlo
            if (node) obs.unobserve(node);
        };
    }, [node, options]);

    // Callback ref: React llama a esto con el elemento (o null al desmontar)
    const ref: RefCallback<T> = (el) => {
        setNode(el);
    };

    return { ref, inView };
}

export default useInView;
