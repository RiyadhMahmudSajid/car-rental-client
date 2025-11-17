import React from "react";
import Background from "../assets/herobanner2.webp";

const Hero = () => {
  return (
    <section
      className="relative text-white py-16 md:py-24 lg:py-32"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center text-center">

        <p className="text-primary font-semibold tracking-wide mb-3 uppercase">
          Premium Car Rentals
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Drive Your <span className="text-primary">Dreams</span>
        </h1>

        <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mb-8">
          Experience luxury and freedom with our handpicked collection of premium vehicles.
          Every journey deserves the perfect ride.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button className=" px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg font-semibold shadow-md hover:opacity-90 transition">
           
            Explore Our Fleet
          </button>

          <button className="px-6 py-3 bg-gray-800 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition ">
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary">1000+</h3>
            <p className="text-gray-300 text-sm sm:text-base">Premium Vehicles</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary">50k+</h3>
            <p className="text-gray-300 text-sm sm:text-base">Happy Drivers</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary">24/7</h3>
            <p className="text-gray-300 text-sm sm:text-base">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
