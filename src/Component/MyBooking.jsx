import React, { useContext } from 'react';
import { AuthContex } from '../Contex/AuthProvider';
import useAxios from './Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaUsers, FaGasPump, FaCog, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from "motion/react";
const MyBooking = () => {
    const { user } = useContext(AuthContex);
    const axiosInstance = useAxios();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['my-booking'],
        queryFn: async () => {
            const result = await axiosInstance.get(`/my-booking?email=${user.email}`);
            return result.data;
        }
    });

    if (isLoading) {
        return <div className="min-h-[60vh] flex items-center justify-center text-text-secondary">Loading your bookings...</div>;
    }

    if (bookings.length === 0) {
        return <div className="min-h-[60vh] flex items-center justify-center text-text-secondary">No bookings found.</div>;
    }

    return (
        <div className='bg-background'>
            <div className="max-w-7xl  mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking,index) => (
                    <motion.div
                     initial={{ opacity: 0, y: 40 }}
                     animate={{opacity:1,y:0}}
                     transition={{duration:0.6, delay:index * 0.2}}
                    
                    
                    key={booking._id} className="bg-surface border border-border rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl">


                        <div className="relative">
                            <img
                                src={booking.car.image}
                                alt={booking.car.name}
                                className="w-full h-48 object-cover"
                            />
                            <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${booking.paymentStatus === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-600/20 text-green-400"
                                }`}>
                                {booking.paymentStatus}
                            </span>
                        </div>


                        <div className="p-4 flex flex-col gap-2">
                            <h2 className="text-xl font-semibold text-text-base">{booking.car.name}</h2>
                            <p className="text-text-secondary text-sm">{booking.car.brand} • {booking.car.type} • {booking.car.year}</p>


                            <div className="flex items-center gap-2 text-yellow-500">
                                {booking.car.rating && <p className="flex items-center"><FaStar /> <span className="ml-1 font-medium">{booking.car.rating}</span></p>}
                            </div>

                            <p className="text-text-secondary text-sm">{booking.car.description}</p>


                            <div className="grid grid-cols-2 gap-2 mt-2 text-text-secondary text-sm">
                                <div className="flex items-center gap-2"><FaGasPump /> {booking.car.fuelType}</div>
                                <div className="flex items-center gap-2"><FaCog /> {booking.car.transmission}</div>
                                <div className="flex items-center gap-2"><FaUsers /> {booking.car.seats} Seats</div>
                                <div className="flex items-center gap-2"><FaCalendarAlt /> {booking.pickupDate} - {booking.returnDate}</div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-text-secondary mt-2">
                                <FaMapMarkerAlt /> {booking.car.location}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

    );
};

export default MyBooking;
