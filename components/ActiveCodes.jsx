"use client";

import { useState } from 'react';
import { Copy, Check, Ticket } from 'lucide-react';
import { CODES_DATA } from '@/lib/mock-data';

export default function ActiveCodes() {
    const [selectedGame, setSelectedGame] = useState(Object.keys(CODES_DATA)[0]);
    const [copiedCode, setCopiedCode] = useState(null);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <section className="col-span-full space-y-6 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Ticket className="w-6 h-6 text-brand-default" />
                    <h2 className="text-heading text-text-default-default tracking-tight">
                        Códigos Activos
                    </h2>
                </div>

                {/* Game Selector Dropdown */}
                <select 
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    className="bg-background-secondary border border-border-default-default text-text-default-default px-4 py-2 rounded-lg 
                               focus:ring-2 focus:ring-brand-default/20 focus:outline-none cursor-pointer transition-colors"
                >
                    {Object.keys(CODES_DATA).map(game => (
                        <option key={game} value={game}>{game}</option>
                    ))}
                </select>
            </div>

            {/* Codes List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CODES_DATA[selectedGame].map((item, idx) => (
                    <div 
                        key={idx}
                        className="bg-background-secondary hover:bg-background-secondary-hover rounded-lg p-3 flex justify-between items-center border border-border-default-secondary transition-colors"
                    >
                        <div className="flex flex-col gap-0.5 max-w-[70%]">
                            <code className="font-mono text-body-strong text-text-default-default tracking-wider">
                                {item.code}
                            </code>
                            <span className="text-body-small text-text-default-secondary truncate">
                                {item.rewards}
                            </span>
                        </div>
                        
                        <button
                            onClick={() => handleCopy(item.code)}
                            className={`
                                p-2 rounded-md transition-all duration-200
                                ${copiedCode === item.code 
                                    ? 'bg-brand-default text-text-brand-on scale-95' 
                                    : 'bg-background-tertiary hover:bg-background-secondary-hover text-text-default-default focus-visible:ring-2 focus-visible:ring-brand-default/20'}
                            `}
                            aria-label="Copiar código"
                        >
                            {copiedCode === item.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
