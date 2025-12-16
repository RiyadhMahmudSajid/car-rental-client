import React, { useContext, useState } from 'react';
import useAxios from '../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContex } from '../../../Contex/AuthProvider';
import { ModalContxt } from '../../../Contex/ModalProvider';
import Payment from '../../Payment/Payment';

const MyAllbooking = () => {
    const { showModal, setShowModal } = useContext(ModalContxt)
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const { user } = useContext(AuthContex);
    const axiosInstance = useAxios();

    const { data: bookings = [], refetch} = useQuery({
        queryKey: ['my-booking'],
        queryFn: async () => {
            const result = await axiosInstance.get(`/my-booking?email=${user.email}`);
            // console.log("result is", result)
            console.log(result.bookings)
            console.log(result.data)
            return result.data;
        }
    });
    console.log("booking is", bookings);


    const handleId = (id) => {
        setSelectedBookingId(id); 
    };

    const handleDelete = async(id)=>{
        const result = await axiosInstance.delete(`/mybooking-cancle/${id}?email=${user.email}`) 
        refetch()
        console.log("delete ",result)
    }
     

    // if (isLoading) {
    //     return <p className="text-center text-lg py-10">Loading...</p>;
    // }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
                <table className="w-full text-left">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="p-4">Image</th>
                            <th className="p-4">Car</th>
                            <th className="p-4">Pickup</th>
                            <th className="p-4">Return</th>
                            <th className="p-4">Price/Day</th>
                            <th className="p-4">Payment</th>
                            {/* <th className="p-4">Status</th> */}
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr
                                key={booking._id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                {/* Image */}
                                <td className="p-4">
                                    <img
                                        src={booking.car.image}
                                        alt={booking.car.name}
                                        className="w-20 h-14 object-cover rounded-md border"
                                    />
                                </td>

                                {/* Car Info */}
                                <td className="p-4">
                                    <p className="font-semibold">{booking.car.name}</p>
                                    <p className="text-sm text-gray-500">{booking.car.brand}</p>
                                </td>

                                {/* Dates */}
                                <td className="p-4">{booking.pickupDate}</td>
                                <td className="p-4">{booking.returnDate}</td>

                                {/* Price */}
                                <td className="p-4 font-semibold">
                                    ${booking.car.pricePerDay}
                                </td>

                                {/* Payment Status */}
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full 
                                        ${booking.paymentStatus === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {booking.paymentStatus}
                                    </span>
                                </td>

                                {/* Booking Status */}
                                {/* <td className="p-4">
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                                        {booking.status || "pending"}
                                    </span>
                                </td> */}

                                {/* Action Buttons */}
                                <td className="p-4 text-center flex gap-2 justify-center">
                                    {booking.paymentStatus === "pending" && (
                                        <button type='button' onClick={() => { setShowModal(true); handleId(booking._id); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                                            Pay
                                        </button>
                                    )}

                                    <button type='button' onClick={()=>handleDelete(booking._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {
                            showModal && <Payment id={selectedBookingId} refetch={refetch}  ></Payment>

                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyAllbooking;
