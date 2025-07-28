import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#110f0e] text-white text-center p-4 font-subjectivity">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8">Lo que buscas no se encuentra aquí</h1>
        <svg
            viewBox="0 0 400 200"
            className="w-72 h-72 text-[#ff6ef3] animate-[wander_4s_ease-in-out_infinite]"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 160 Q200 20 380 160"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="12 12"
                className="animate-[dash_6s_linear_infinite]"
            />
        </svg>
        <Link
            to="/"
            className="mt-8 inline-block bg-[#ff6ef3] hover:bg-[#ff42e4] text-black font-bold py-2 px-4 rounded transition-colors"
        >
            Volver al inicio
        </Link>
    </div>
);

export default NotFoundPage;