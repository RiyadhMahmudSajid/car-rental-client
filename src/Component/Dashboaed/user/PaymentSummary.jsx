import React from "react";
import { FaStar, FaUsers, FaGasPump, FaCog, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const PaymentSummary = ({ booking }) => {
    if (!booking) return <div>Loading...</div>;

    const { car, pickupDate, returnDate, paymentStatus } = booking;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-surface rounded-2xl shadow-lg border border-border mt-10">
            <h1 className="text-2xl font-bold text-text-base mb-6 text-center">
                Payment Summary
            </h1>

            {/* Car Info */}
            <div className="flex gap-6 mb-6">
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-32 h-24 object-cover rounded-lg border border-border"
                />
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-text-base">{car.name}</h2>
                    <p className="text-text-secondary">{car.brand} • {car.type} • {car.year}</p>
                    <div className="flex items-center gap-2 text-yellow-500 mt-1">
                        {car.rating && (
                            <>
                                <FaStar /> <span className="font-medium">{car.rating}</span>
                            </>
                        )}
                    </div>
                    <p className="text-text-secondary mt-2">{car.description}</p>
                </div>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-background rounded-lg border border-border">
                    <p className="text-text-secondary text-sm">Pickup Date</p>
                    <p className="font-medium">{pickupDate}</p>
                </div>
                <div className="p-3 bg-background rounded-lg border border-border">
                    <p className="text-text-secondary text-sm">Return Date</p>
                    <p className="font-medium">{returnDate}</p>
                </div>
                <div className="p-3 bg-background rounded-lg border border-border">
                    <p className="text-text-secondary text-sm">Price / Day</p>
                    <p className="font-medium">{car.currency} {car.pricePerDay}</p>
                </div>
                <div className="p-3 bg-background rounded-lg border border-border">
                    <p className="text-text-secondary text-sm">Payment Status</p>
                    <p className={`font-medium ${paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                        {paymentStatus}
                    </p>
                </div>
            </div>

            {/* Car Features */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-base mb-2">Car Features</h3>
                <ul className="flex flex-wrap gap-2 text-sm">
                    {car.features?.map((feature, idx) => (
                        <li key={idx} className="bg-surface border border-border px-3 py-1 rounded-full text-text-secondary">
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Car Additional Info */}
            <div className="flex items-center justify-between text-text-secondary">
                <div className="flex items-center gap-2"><FaMapMarkerAlt /> {car.location}</div>
                <div className="flex items-center gap-2"><FaCalendarAlt /> {car.year}</div>
                <div className="flex items-center gap-2"><FaUsers /> {car.seats} Seats</div>
            </div>
        </div>
    );
};

export default PaymentSummary;
