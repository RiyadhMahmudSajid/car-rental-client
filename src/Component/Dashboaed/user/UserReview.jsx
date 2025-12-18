import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FaStar, FaCheckCircle, FaCar, FaPen } from 'react-icons/fa';
import useAxios from '../../Hook/useAxios';
import { AuthContex } from '../../../Contex/AuthProvider';

const UserReview = () => {
   const { user } = useContext(AuthContex);; 
    const axiosInstance = useAxios();
    const { data: bookings = [] , isLoading} = useQuery({
        queryKey: ['my-booking', user?.email],
        queryFn: async () => {
            const result = await axiosInstance.get(`/my-booking?email=${user.email}`);
            // console.log("result is", result)
            console.log(result.bookings)
            console.log(result.data)
            return result.data;
        }
    });
    if (isLoading) return <p>Loading...</p>;
    const paidBookings = bookings.filter(b => b.paymentStatus === 'paid');
    console.log(paidBookings);

    return (
        <div className="p-6 bg-[var(--color-background)] min-h-screen">
            <h2 className="text-2xl font-black text-[var(--color-text-base)] mb-8 flex items-center gap-3">
                <FaStar className="text-[var(--color-accent)]" />
                Rate Your Experience
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paidBookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-[var(--color-surface)] p-6 rounded-[2rem] border border-[var(--color-border)] shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 transition-all hover:border-[var(--color-primary)]/50"
                    >

                        <div className="flex items-center gap-4 w-full">
                            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                                <FaCar size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[var(--color-text-base)] text-lg">{booking.itemName}</h3>
                                <div className="flex items-center gap-2 text-green-500 font-bold text-xs uppercase tracking-widest">
                                    <FaCheckCircle size={12} />
                                    <span>Payment Paid</span>
                                </div>
                            </div>
                        </div>


                        <button
                            className="w-full md:w-auto px-6 py-3 rounded-2xl bg-[var(--color-primary)] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[var(--color-primary)]/90 active:scale-95 transition-all shadow-lg shadow-[var(--color-primary)]/20"
                            onClick={() => console.log("Open Review Modal for:", booking._id)}
                        >
                            <FaPen size={14} /> Write Review
                        </button>
                    </div>
                ))}
            </div>


            {paidBookings.length === 0 && (
                <div className="text-center py-20 bg-[var(--color-surface)] rounded-[3rem] border-2 border-dashed border-[var(--color-border)]">
                    <p className="text-[var(--color-text-secondary)] font-medium">No paid bookings found to review.</p>
                </div>
            )}
        </div>
    );
};

export default UserReview;