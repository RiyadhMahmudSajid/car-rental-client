import React, { useState } from 'react';
import qualityimg from '../assets/Quality.jpg';
import { motion } from "motion/react";
const QualityFeatured = () => {
    const [activeTab, setActiveTab] = useState("Luxury");

    const tabs = [
        { id: 'luxury', name: 'Luxury' },
        { id: 'comfort', name: 'Comfort' },
        { id: 'prestige', name: 'Prestige' },
    ];

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-20   bg-surface py-16 md:py-20 lg:py-24 px-8 lg:px-24">

            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="w-full  flex-1 ">
                <img src={qualityimg} alt="Quality Cars" className="rounded-2xl  w-full object-cover bg-center " />
            </motion.div>


            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="flex-1">
                <h2 className="text-4xl md:text-3xl lg:text-4xl font-extrabold dark:text-white ">
                    Only Quality For Clients
                </h2>


                <div className="flex flex-wrap gap-4 my-10 md:my-6 lg:my-10">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.name)}
                            className={`px-3 cursor-pointer lg:px-5 py-0.5 lg:py-2 rounded-lg font-semibold border transition-all duration-300 ${activeTab === tab.name
                                ? "bg-primary text-white border-primary"
                                : "bg-transparent border-gray-400 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>


                <div className="max-w-3xl text-gray-700 leading-relaxed mx-auto pr-0 md:pr-0 lg:pr-4">
                    {activeTab === 'Luxury' && (
                        <p className='text-text-secondary'>
                            We offer a meticulously curated collection of the most sought-after **luxury vehicles** on the market. Whether you prefer the sporty allure of a high-performance sports car or the sophistication of a sleek sedan, we provide the best.
                        </p>
                    )}

                    {activeTab === 'Comfort' && (
                        <p className='text-text-secondary'>
                            Experience supreme **comfort** and advanced technology designed to make your ride smooth and stress-free. Our vehicles are spacious, reliable, and perfectly maintained for long journeys.
                        </p>
                    )}

                    {activeTab === 'Prestige' && (
                        <p className='text-text-secondary'>
                            Our **prestige** collection offers unmatched elegance and refinement for those who demand nothing but the best. Make a powerful statement with an exclusive, top-tier rental.
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default QualityFeatured;
