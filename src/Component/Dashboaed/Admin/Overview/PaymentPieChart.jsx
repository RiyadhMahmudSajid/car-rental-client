import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hook/useAxios";


const COLORS = ["#10B981", "#F59E0B"];

const PaymentPieChart = () => {
  const axiosInstance = useAxios();

  const { data: bookings = [] } = useQuery({
    queryKey: ["payment-pie"],
    queryFn: async () => {
      const res = await axiosInstance.get("/booking");
      return res.data;
    },
  });

  const paid = bookings.filter(b => b.paymentStatus === "paid").length;
  const pending = bookings.filter(b => b.paymentStatus === "pending").length;

  const pieData = [
    { name: "Paid", value: paid },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="p-4 bg-white shadow rounded h-80">
      <h2 className="font-bold mb-3">Payment Status</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={pieData} dataKey="value" label>
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentPieChart;
