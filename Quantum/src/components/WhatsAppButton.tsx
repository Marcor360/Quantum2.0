import React from 'react';
import WhatsAppIcon from '../assets/icons/whatsapp.svg?react';

const WhatsAppButton: React.FC = () => (
    <a
        href="https://wa.me/525520814083"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] p-4 sm:p-5 rounded-full shadow-lg hover:bg-[#1ebe59] transition-colors text-white"
    >
        <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
);

export default WhatsAppButton;