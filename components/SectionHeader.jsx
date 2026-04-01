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
    ctaLabel = "Ver todo",
    variant = "section",
    children
}) {
    const isPage = variant === "page";
    const TitleTag = isPage ? "h1" : "h2";
    
    return (
        <div className={`flex flex-col ${isPage ? 'gap-6 md:gap-8 mb-2' : 'gap-4 mb-2'}`}>
            <div className="flex items-center justify-between border-b border-border-default-secondary pb-4 group/header">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className={`flex items-center justify-center rounded-xl bg-background-secondary border border-border-default-secondary text-brand-default shadow-sm group-hover/header:border-brand-default/30 transition-colors ${isPage ? 'w-12 h-12 shrink-0' : 'w-10 h-10 shrink-0'}`}>
                            <Icon className={isPage ? "w-6 h-6" : "w-5 h-5"} />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <TitleTag className={`${isPage ? 'text-subtitle md:text-title-page' : 'text-heading uppercase tracking-tight'} text-text-default-default flex items-center gap-2 leading-tight`}>
                            {title}
                            {!isPage && subtitle && (
                                <span className="text-text-default-tertiary hidden sm:inline">{subtitle}</span>
                            )}
                        </TitleTag>
                        <div className="h-0.5 w-12 bg-brand-default rounded-full mt-1.5 origin-left group-hover/header:w-full transition-all duration-500" />
                    </div>
                </div>

                {href && !isPage && (
                    <Link
                        href={href}
                        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-text-default-secondary hover:text-text-default-default hover:bg-background-secondary transition-all text-body-small-strong shrink-0"
                    >
                        <span className="hidden sm:inline">{ctaLabel}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/header:translate-x-1" />
                    </Link>
                )}
            </div>

            {isPage && subtitle && (
                <p className="text-body-base text-text-default-secondary max-w-4xl -mt-2 md:-mt-4">
                    {subtitle}
                </p>
            )}

            {children && (
                <div className="w-full">
                    {children}
                </div>
            )}
        </div>
    );
}
