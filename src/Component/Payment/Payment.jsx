import React from "react";
import { FaCreditCard, FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Payment = ({onClose}) => {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

      <div className="bg-surface w-full max-w-md p-6 rounded-2xl shadow-xl border border-border relative">

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-red-500 transition">
          <IoClose size={28} />
        </button>

        <h1 className="text-2xl font-bold text-text-base text-center mb-6">
          Complete Your Payment
        </h1>

        {/* Card Payment */}
        <div className="mb-6">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-border/40 transition">
            <input type="radio" name="payment" className="accent-primary" defaultChecked />
            <FaCreditCard className="text-primary text-xl" />
            <span className="font-medium">Credit / Debit Card</span>
          </label>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <input type="text" placeholder="Card Holder Name" className="p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none" />
            <input type="text" placeholder="Card Number" className="p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none" />
           
          </div>
        </div>

        {/* Mobile Banking */}
        <div className="mb-6">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-border/40 transition">
            <input type="radio" name="payment" className="accent-primary" />
            <FaMobileAlt className="text-pink-500 text-xl" />
            <span className="font-medium">Bkash / Nagad</span>
          </label>

          <div className="mt-4  w-full">
            <input type="number" placeholder="Mobile Number" className="p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none" />
          
          </div>
        </div>

        {/* Cash Payment */}
       

        <button className="w-full bg-primary text-white py-2.5 rounded-xl font-semibold shadow hover:bg-primary/90 transition">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
