"use client";

import { useState } from 'react';
import { Copy, Check, Ticket } from 'lucide-react';

const CODES_DATA = {
    "Wuthering Waves": [
        { code: "WUTHERINGGIFT", rewards: "50 Astrite, 2 Premium Resonance Potion" },
        { code: "WUTHERING2024", rewards: "10,000 Shell Credits" }
    ],
    "Genshin Impact": [
        { code: "GENSHINGIFT", rewards: "50 Primogems, 3 Hero's Wit" },
        { code: "BS3DLY6VARE9", rewards: "100 Primogems" }
    ],
    "Honkai Star Rail": [
        { code: "STARRAILGIFT", rewards: "50 Stellar Jade" }
    ]
};

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
                    <Ticket className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground tracking-tight">
                        Códigos Activos
                    </h2>
                </div>

                {/* Game Selector Dropdown */}
                <select 
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    className="bg-card border border-border text-foreground px-4 py-2 rounded-lg 
                               focus:ring-2 focus:ring-ring focus:outline-none cursor-pointer transition-colors"
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
                        className="bg-secondary/50 rounded-lg p-3 flex justify-between items-center border border-border/50"
                    >
                        <div className="flex flex-col gap-0.5 max-w-[70%]">
                            <code className="font-mono font-bold text-foreground text-sm tracking-wider">
                                {item.code}
                            </code>
                            <span className="text-[10px] text-muted-foreground truncate">
                                {item.rewards}
                            </span>
                        </div>
                        
                        <button
                            onClick={() => handleCopy(item.code)}
                            className={`
                                p-2 rounded-md transition-all duration-200
                                ${copiedCode === item.code 
                                    ? 'bg-accent text-accent-foreground scale-95' 
                                    : 'bg-primary hover:bg-accent text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring'}
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
