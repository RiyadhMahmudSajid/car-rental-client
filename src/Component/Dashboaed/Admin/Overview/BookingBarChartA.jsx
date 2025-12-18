import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hook/useAxios";


const BookingBarChartA = () => {
  const axiosInstance = useAxios();

  const { data: bookings = [] } = useQuery({
    queryKey: ["booking-bar"],
    queryFn: async () => {
      const res = await axiosInstance.get("/booking");
      return res.data;
    },
  });


  const carCount = bookings.reduce((acc, b) => {
    const name = b.car?.name || "Unknown";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(carCount).map(name => ({
    name,
    count: carCount[name],
  }));

  return (
    <div className="p-4 bg-white shadow rounded h-80">
      <h2 className="font-bold mb-3">Bookings Per Car</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingBarChartA;
