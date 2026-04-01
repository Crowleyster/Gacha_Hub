import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function FilterDropdown({ label, options, selected, onChange, displayFormatter }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        const newSelected = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];
        onChange(newSelected);
    };

    return (
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px] relative" ref={dropdownRef}>
            <span className="text-badge text-text-default-tertiary px-1">{label}</span>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-11 flex items-center justify-between bg-background-tertiary border rounded-xl px-3 transition-all ${isOpen ? 'border-border-default-default ring-1 ring-border-default-default/20' : 'border-border-default-secondary'} hover:border-border-default-default`}
            >
                <span className={`text-body-small-strong truncate ${selected.length > 0 ? 'text-text-default-default' : 'text-text-default-tertiary'}`}>
                    {selected.length === 0 ? "Todos" : `${label} (${selected.length})`}
                </span>
                <ChevronDown className={`w-4 h-4 text-text-default-tertiary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-max bg-background-secondary border border-border-default-secondary rounded-xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="space-y-1 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                        {options.map(option => (
                            <button
                                key={option}
                                onClick={() => toggleOption(option)}
                                className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-background-tertiary transition-colors text-left group"
                            >
                                <span className={`text-body-small font-medium ${selected.includes(option) ? 'text-text-default-default' : 'text-text-default-secondary'}`}>
                                    {displayFormatter ? displayFormatter(option) : option}
                                </span>
                                <div className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all ${selected.includes(option) ? 'bg-text-brand-default border-text-brand-default' : 'border-border-default-secondary group-hover:border-text-default-tertiary'}`}>
                                    {selected.includes(option) && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
