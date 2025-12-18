import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-8 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* --- 1. BRAND SECTION --- */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center text-white font-black text-xl">
                                C
                            </div>
                            <span className="text-2xl font-black text-[var(--color-text-base)] tracking-tight">
                                Car<span className="text-[var(--color-primary)]">Ease</span>
                            </span>
                        </div>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                            Providing the best car rental and management experience since 2024. Your journey, our priority.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                                <a key={index} href="#" className="w-9 h-9 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300 shadow-sm">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[var(--color-text-base)] font-bold mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-1 left-0 w-8 h-1 bg-[var(--color-primary)] rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Home', 'Find Cars', 'About Us', 'Services', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:translate-x-2 flex items-center gap-2 transition-all duration-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] opacity-0 hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h4 className="text-[var(--color-text-base)] font-bold mb-6 relative inline-block">
                            Support
                            <span className="absolute -bottom-1 left-0 w-8 h-1 bg-[var(--color-primary)] rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['My Bookings', 'Help Center', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h4 className="text-[var(--color-text-base)] font-bold mb-6 relative inline-block">
                            Get In Touch
                            <span className="absolute -bottom-1 left-0 w-8 h-1 bg-[var(--color-primary)] rounded-full"></span>
                        </h4>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-primary)]">
                                    <FaMapMarkerAlt size={16} />
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)] leading-snug">
                                    123 Luxury Road, <br /> Gulshan, Dhaka 1212
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-primary)]">
                                    <FaPhoneAlt size={14} />
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)] font-bold">
                                    +880 1234 567 890
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-primary)]">
                                    <FaEnvelope size={14} />
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    support@carease.com
                                </p>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-80">
                    <p>© {currentYear} CarEase Management. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Cookie Policy</a>
                        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;