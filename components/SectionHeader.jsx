"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * SectionHeader Component
 * 
 * Standardized header for layout sections following the 'Technical Blueprint' aesthetic.
 * 
 * @param {React.ReactNode} icon - Lucide icon component
 * @param {string} title - Main title
 * @param {string} subtitle - Grayed out part of the title (optional)
 * @param {string} href - Link for the CTA (optional)
 * @param {string} ctaLabel - Label for the CTA
 */
export default function SectionHeader({ 
    icon: Icon, 
    title, 
    subtitle, 
    href, 
    ctaLabel = "Ver todo" 
}) {
    return (
        <div className="flex items-center justify-between border-b border-border-default-secondary pb-4 mb-2 group/header">
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-background-secondary border border-border-default-secondary text-brand-default shadow-sm group-hover/header:border-brand-default/30 transition-colors">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <div className="flex flex-col">
                    <h2 className="text-heading text-text-default-default uppercase tracking-tight flex items-center gap-2">
                        {title}
                        {subtitle && (
                            <span className="text-text-default-tertiary hidden sm:inline">{subtitle}</span>
                        )}
                    </h2>
                    <div className="h-0.5 w-12 bg-brand-default rounded-full mt-1 origin-left group-hover/header:w-full transition-all duration-500" />
                </div>
            </div>

            {href && (
                <Link
                    href={href}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-text-default-secondary hover:text-text-default-default hover:bg-background-secondary transition-all text-body-small-strong"
                >
                    <span className="hidden sm:inline">{ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/header:translate-x-1" />
                </Link>
            )}
        </div>
    );
}
