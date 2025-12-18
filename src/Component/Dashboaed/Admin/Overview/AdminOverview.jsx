import React from "react";

import BookingBarChartA from "./BookingBarChartA";
import PaymentPieChart from "./PaymentPieChart";
import AdminKpi from "./AdminKpi";



const AdminOverview = () => {
    return (
        <div className="p-6 space-y-10">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <AdminKpi />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BookingBarChartA />
                <PaymentPieChart />
            </div>
        </div>
    );
};

export default AdminOverview;
