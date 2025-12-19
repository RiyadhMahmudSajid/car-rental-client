import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import useAxios from '../../Hook/useAxios';
import { AuthContex } from '../../../Contex/AuthProvider';
import { useForm } from 'react-hook-form';



const UserReview = () => {
    const { user } = useContext(AuthContex);
    const axiosInstance = useAxios();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const { data: bookings = [], isLoading, reset } = useQuery({
        queryKey: ['my-booking', user?.email],
        queryFn: async () => {
            const result = await axiosInstance.get(`/my-booking?email=${user.email}`);
            return result.data;
        }
    });

    const onSubmit = async (data) => {
        const reviewData = {
            userName: user?.displayName,
            userEmail: user?.email,
            userImage: user?.photoURL,
            rating: rating,
            reviewText: data.reviewText,
            date: new Date().toISOString(),
        };
        try {
            const res = await axiosInstance.post("/reviews", reviewData);

            if (res.data.insertedId) {
                alert("Review submitted successfully!");
                reset();
                setRating(0);
            }
        } catch (error) {
            console.error("Submission error:", error);
        }

    };

    if (isLoading) return <div className="text-center py-10 text-primary">Loading...</div>;


    const hasPaidBooking = bookings.some(b => b.paymentStatus === 'paid');

    return (
        <div className="max-w-2xl mx-auto">
            {hasPaidBooking ? (

                <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm transition-colors duration-300">
                    <h3 className="text-2xl font-bold text-text-base mb-2">Share Your Experience</h3>
                    <p className="text-text-secondary mb-6">Your feedback helps us provide a better experience.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         
                        <div>
                            <label className="block text-sm font-medium text-text-base mb-3">Your Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={`text-3xl transition-colors ${(hover || rating) >= star ? 'text-accent' : 'text-border'}`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        <FaStar />
                                    </button>
                                ))}
                            </div>
                        </div>

           
                        <div>
                            <label className="block text-sm font-medium text-text-base mb-2">Your Review</label>
                            <textarea
                                {...register("reviewText", { required: true })} 
                                rows="4"
                                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-text-base focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                placeholder="Tell us about your ride..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            ) : (

                <div className="bg-surface p-10 rounded-3xl border border-border text-center">
                    <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCar className="text-3xl text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-base mb-2">No Completed Trips Yet</h3>
                    <p className="text-text-secondary">
                        You can only share a review after completing your first paid trip with us.
                        Ready to start your adventure?
                    </p>
                    <button className="mt-6 bg-accent text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
                        Book a Car Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserReview;