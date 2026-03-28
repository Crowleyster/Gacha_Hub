import { 
    FaSteam, 
    FaPlaystation, 
    FaXbox, 
    FaApple, 
    FaAndroid 
} from 'react-icons/fa6';
import { Monitor, Gamepad } from 'lucide-react';

/**
 * PlatformIcon Component
 * 
 * Renders branded icons for gaming platforms.
 * Uses 'react-icons/fa6' (Font Awesome 6) for most brands.
 * Includes custom SVGs for specific brands not in FA6 (Epic, Switch).
 * 
 * @param {string} platform - The platform name (e.g., "Steam", "Epic Store", "Android", "iOS")
 * @param {string} className - Optional Tailwind classes
 */
export default function PlatformIcon({ platform, className = "w-3.5 h-3.5" }) {
    const p = platform.toLowerCase();

    // ─── Apple (iOS / Mac) ───
    if (p === 'ios' || p === 'iphone' || p === 'ipad' || p === 'apple' || p === 'mac' || p === 'macos') {
        return <FaApple className={className} />;
    }

    // ─── Android ───
    if (p === 'android') {
        return <FaAndroid className={className} />;
    }

    // ─── Steam ───
    if (p === 'steam') {
        return <FaSteam className={className} />;
    }

    // ─── Playstation ───
    if (p.includes('ps') || p.includes('playstation')) {
        return <FaPlaystation className={className} />;
    }

    // ─── Xbox ───
    if (p.includes('xbox')) {
        return <FaXbox className={className} />;
    }

    // ─── Nintendo Switch (Custom SVG to avoid library errors) ───
    if (p.includes('switch') || p === 'nintendo') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
                <path d="M12.923 0V24H18.923C21.685 24 23.923 21.762 23.923 19V5C23.923 2.238 21.685 0 18.923 0H12.923ZM18.923 5C19.751 5 20.423 5.672 20.423 6.5C20.423 7.328 19.751 8 18.923 8C18.095 8 17.423 7.328 17.423 6.5C17.423 5.672 18.095 5 18.923 5ZM5 0C2.238 0 0 2.238 0 5V19C0 21.762 2.238 24 5 24H11V0H5ZM5 20C4.172 20 3.5 19.328 3.5 18.5C3.5 17.672 4.172 17 5 17C5.828 17 6.5 17.672 6.5 18.5C6.5 19.328 5.828 20 5 20Z" />
            </svg>
        );
    }

    // ─── Epic Games Store (Custom SVG for reliability) ───
    if (p.includes('epic')) {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
                <path d="M12 0L2.121 5.76V18.24L12 24L21.879 18.24V5.76L12 0ZM18.561 16.32L12 20.16L5.439 16.32V7.68L12 3.84L18.561 7.68V16.32ZM12 6.72L15.361 8.64V12L12 10.08L8.639 12V8.64L12 6.72ZM12 13.92L15.361 15.84V17.28L12 15.36L8.639 17.28V15.84L12 13.92Z" />
            </svg>
        );
    }

    // ─── PC (Windows / Monitor) ───
    if (p === 'pc' || p === 'windows' || p === 'desktop') {
        return <Monitor className={className} />;
    }

    // ─── Fallback ───
    return <Gamepad className={className} />;
}
