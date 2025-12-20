import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from "motion/react";
const CarFleetCTA = () => {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}>
            <div className="max-w-6xl mx-auto overflow-hidden rounded-[2rem] shadow-2xl">

                <div className="relative bg-gradient-to-r from-blue-600  to-cyan-500 p-8 md:p-16 text-center text-white">

                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-200 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                            Ready to Start Your Journey?
                        </h2>

                        <p className="text-lg  text-blue-50 mb-8 max-w-2xl mx-auto font-medium opacity-90">
                            Browse our fleet and find the perfect car for your next adventure.
                            We offer the best rates and premium quality vehicles.
                        </p>

                        <Link
                            to="/all-cars"
                            className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-md hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg group"
                        >
                            Explore Our Fleet
                            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default CarFleetCTA;