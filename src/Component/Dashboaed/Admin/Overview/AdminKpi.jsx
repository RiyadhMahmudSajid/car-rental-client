import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hook/useAxios';
import { FaCar, FaMoneyBill, FaClock, FaCheck } from "react-icons/fa";
const AdminKpi = () => {

    const axiosInstance = useAxios()
    const { data: bookings = [] } = useQuery({
        queryKey: ["admin-bookings"],
        queryFn: async () => {
            const res = await axiosInstance.get("/booking")
            return res.data
        }
    })
    const { data: cars = [] } = useQuery({
        queryKey: ["admin-cars"],
        queryFn: async () => {
            const res = await axiosInstance.get("/all-car");
            return res.data;
        },
    })

    const totalBookings = bookings.length;
    const paidBookings = bookings.filter(b => b.paymentStatus === "paid").length
    const pendingBookings = bookings.filter(b => b.paymentStatus === "pending").length;

    const totalRevenue = bookings
        .filter(b => b.paymentStatus === "paid")
        .reduce((sum, b) => sum + (b.car?.pricePerDay || 0), 0);



    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card title="Total Bookings" value={totalBookings} icon={<FaCar />} />
            <Card title="Paid" value={paidBookings} icon={<FaCheck />} />
            <Card title="Pending" value={pendingBookings} icon={<FaClock />} />
            <Card title="Revenue" value={`$${totalRevenue}`} icon={<FaMoneyBill />} />
            <Card title="Cars" value={cars.length} icon={<FaCar />} />
        </div>
    );
};
const Card = ({ title, value, icon }) => (
    <div className="p-4 bg-white shadow rounded">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
        {icon}
    </div>
);

export default AdminKpi;