import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, } from "recharts";
import { FaDollarSign, FaCheckCircle, FaClock, FaCar, FaChartBar, FaChartPie, } from "react-icons/fa";
import { AuthContex } from "../../Contex/AuthProvider";
import useAxios from "../Hook/useAxios";
const PIE_COLORS = ["var(--color-accent)", "var(--color-text-secondary)"];
const BAR_COLOR = "var(--color-primary)";
const Overview = () => {
  const { user } = useContext(AuthContex);
  const axiosInstance = useAxios();
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["overview", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosInstance.get(`/my-booking?email=${user.email}`);
      return res.data || [];
    },
    enabled: !!user,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-base)' }}>
        <p className="text-xl">Loading Data...</p>
      </div>
    );
  }
  const carCounts = bookings.reduce((acc, booking) => {
    const carName = booking.car?.name || "Unknown Car";
    acc[carName] = (acc[carName] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(carCounts).map((name) => ({
    name,
    bookingCount: carCounts[name],
  }));

  const paidCount = bookings.filter((b) => b.paymentStatus === "paid").length;
  const pendingCount = bookings.filter((b) => b.paymentStatus === "pending").length;

  const pieData = [
    { name: "Paid", value: paidCount },
    { name: "Pending", value: pendingCount },
  ];

  const paidValue = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, booking) => sum + (booking.car?.pricePerDay || 0), 0);

  const KpiCard = ({ icon, title, value, color }) => (

    <div
      className="p-6 rounded-xl shadow-lg flex items-center justify-between transition duration-300 hover:shadow-xl"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderLeft: `4px solid ${color}`,
        border: `1px solid var(--color-border)`,
        color: 'var(--color-text-base)'
      }}
    >
      <div>

        <p className="text-sm font-medium uppercase" style={{ color: 'var(--color-text-secondary)' }}>
          {title}
        </p>
        <p className="text-3xl font-extrabold mt-1">{value}</p>
      </div>
      <div
        className="p-3 rounded-full opacity-70"
        style={{ color: color }}
      >
        {React.cloneElement(icon, {
          className: `w-6 h-6`,
        })}
      </div>
    </div>
  );

  return (

    <div className="p-6 space-y-10 min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>

      <h1 className="text-4xl font-extrabold border-b pb-3" style={{ color: 'var(--color-text-base)', borderColor: 'var(--color-border)' }}>
        Dashboard Overview
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard
          icon={<FaCar />}
          title="Total Bookings"
          value={bookings.length}
          color="var(--color-primary)"
        />
        <KpiCard
          icon={<FaCheckCircle />}
          title="Paid Bookings"
          value={paidCount}
          color="#10B981"
        />
        <KpiCard
          icon={<FaClock />}
          title="Pending Bookings"
          value={pendingCount}
          color="var(--color-accent)"
        />
        <KpiCard
          icon={<FaDollarSign />}
          title="Paid Revenue (Simple)"
          value={`$${paidValue.toFixed(2)}`}
          color="#3B82F6"
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


        <div
          className="p-6 rounded-xl shadow-lg"
          style={{ backgroundColor: 'var(--color-surface)', border: `1px solid var(--color-border)` }}
        >

          <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: 'var(--color-text-base)' }}>
            <FaChartBar className="mr-2" style={{ color: 'var(--color-primary)' }} /> Bookings Per Car Model
          </h2>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>

                <XAxis dataKey="name" style={{ fill: 'var(--color-text-secondary)' }} />
                <YAxis allowDecimals={false} style={{ fill: 'var(--color-text-secondary)' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', border: `1px solid var(--color-border)`, color: 'var(--color-text-base)' }} />
                <Legend wrapperStyle={{ color: 'var(--color-text-secondary)' }} />
                <Bar
                  dataKey="bookingCount"
                  fill={BAR_COLOR} 
                  name="Total Bookings"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center py-10" style={{ color: 'var(--color-text-secondary)' }}>No car booking data to display.</p>
          )}
        </div>

        <div
          className="p-6 rounded-xl shadow-lg"
          style={{ backgroundColor: 'var(--color-surface)', border: `1px solid var(--color-border)` }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: 'var(--color-text-base)' }}>
            <FaChartPie className="mr-2" style={{ color: PIE_COLORS[0] }} /> Payment Status Distribution
          </h2>
          {bookings.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                      className="transition duration-300 hover:opacity-80"
                    />
                  ))}
                </Pie>

                <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ color: 'var(--color-text-secondary)' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', border: `1px solid var(--color-border)`, color: 'var(--color-text-base)' }} formatter={(value, name) => [value, name]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center py-10" style={{ color: 'var(--color-text-secondary)' }}>No payment data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;