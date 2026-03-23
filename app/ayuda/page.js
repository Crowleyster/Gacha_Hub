"use client";

import { useState } from 'react';
import { CircleHelp, ChevronDown, Mail } from 'lucide-react';

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-border-default-secondary rounded-xl bg-background-secondary overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full p-4 text-left hover:bg-background-secondary-hover transition-colors">
                <span className="text-body-strong text-text-default-default">{question}</span>
                <ChevronDown className={`w-5 h-5 text-text-default-secondary transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 pt-0 text-body-base text-text-default-secondary border-t border-border-default-secondary/50 mt-2 pt-2">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function Ayuda() {
    return (
        <main className="col-span-full space-y-8 pb-content-safe font-sans max-w-3xl">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-background-secondary rounded-xl">
                        <CircleHelp className="w-6 h-6 text-text-brand-default" />
                    </div>
                    <h1 className="text-title-page text-text-default-default">Centro de Ayuda</h1>
                </div>
                <p className="text-body-base text-text-default-secondary">
                    Encuentra respuestas a las preguntas más comunes sobre Gacha Hub o contáctanos si necesitas asistencia.
                </p>
            </div>

            <section className="flex flex-col gap-4">
                <h2 className="text-heading text-text-default-default">Preguntas Frecuentes</h2>
                <div className="flex flex-col gap-3">
                    <FAQItem 
                        question="¿Cada cuánto se actualizan los códigos de canje?" 
                        answer="Nuestro sistema rastrea y actualiza los códigos cada 30 minutos. Si hay un código nuevo de un Livestream, aparecerá casi al instante." 
                    />
                    <FAQItem 
                        question="¿Cómo configuro mi región para los juegos?" 
                        answer="Puedes dirigirte a la página de 'Ajustes' en el menú principal para seleccionar tu región preferida. Esto filtrará los códigos y eventos que no correspondan a tu servidor." 
                    />
                    <FAQItem 
                        question="Mi juego favorito no está en la lista. ¿Pueden agregarlo?" 
                        answer="¡Sí! Constantemente estamos añadiendo nuevos títulos. Puedes usar el botón de contacto más abajo para sugerir un juego." 
                    />
                </div>
            </section>

            <section className="flex flex-col items-center justify-center p-8 mt-8 bg-brand-default/5 border border-border-default-secondary rounded-2xl text-center gap-4">
                <div className="p-3 bg-brand-default text-text-brand-on rounded-full">
                    <Mail className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-heading text-text-default-default">¿Necesitas más ayuda?</h3>
                    <p className="text-body-base text-text-default-secondary">Envíanos un correo y te responderemos lo antes posible.</p>
                </div>
                <a href="mailto:soporte@gachahub.com" className="px-6 py-3 bg-brand-default text-text-brand-on rounded-xl text-body-strong hover:opacity-90 transition-opacity">
                    Contactar Soporte
                </a>
            </section>
        </main>
    );
}
