import React from 'react';

const WhyChoose = () => {
    return (
        <div>
            <section className="bg-background py-20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
               
                    <div className="text-center mb-16">
                        <h2 className="text-primary font-bold tracking-wide uppercase text-sm">Why Choose Us</h2>
                        <p className="mt-2 text-3xl md:text-4xl font-extrabold text-text-base">
                            Experience the Best Car Rental Service
                        </p>
                        <div className="w-20 h-1.5 bg-accent mx-auto mt-4 rounded-full"></div>
                    </div>

             
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div className="bg-surface p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 shadow-sm group">
                            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <svg className="w-8 h-8 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Circle 9 9 0 0118 0v6l-2 2H5l-2-2V9a9 9 0 0118 0z" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-text-base mb-3">Verified Fleet</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Every vehicle undergoes a 50-point safety check before every rental.
                            </p>
                        </div>

                     
                        <div className="bg-surface p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 shadow-sm group">
                            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <svg className="w-8 h-8 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-text-base mb-3">Best Price</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Transparent pricing with no hidden charges. We match any competitor's price.
                            </p>
                        </div>

                  
                        <div className="bg-surface p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 shadow-sm group">
                            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <svg className="w-8 h-8 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-text-base mb-3">Instant Booking</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Book your favorite car in less than 60 seconds with our instant approval.
                            </p>
                        </div>

                       
                        <div className="bg-surface p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 shadow-sm group">
                            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <svg className="w-8 h-8 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-text-base mb-3">24/7 Support</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Our dedicated support team is always ready to help you on the road.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyChoose;