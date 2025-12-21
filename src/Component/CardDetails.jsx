import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from './Hook/useAxios';
import { FaStar, FaUsers, FaGasPump, FaCog, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { AuthContex } from '../Contex/AuthProvider';
import Payment from './Payment/Payment';
import { ModalContxt } from '../Contex/ModalProvider';
import Loading from './Loading/Loading';

export default function CarDetails() {
  const { showModal, setShowModal } = useContext(ModalContxt);
  const [bookingId, setBookingId] = useState(null);
  const axios = useAxios();
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContex);

  const { data: car, isLoading, isError } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const res = await axios.get(`/all-cars/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);


  const calculateTotalPrice = (startStr, endStr, pricePerDay) => {
    if (!startStr || !endStr || !pricePerDay) return pricePerDay || 0;

    const start = new Date(startStr);
    const end = new Date(endStr);

    let days = Math.floor((end - start) / (1000 * 60 * 60 * 24));


    if (days <= 0) days = 1;

    return days * pricePerDay;
  };


  useEffect(() => {
    if (!car) return
    console.log("hakim")
    const price = calculateTotalPrice(pickupDate, returnDate, car?.pricePerDay);
    setTotalPrice(price);
  }, [pickupDate, returnDate, car]);

  const { register, handleSubmit, watch } = useForm();
  const selectedArea = watch("area");
  const onSubmit = async (data) => {
    const bookingInfo = {
      name: user?.displayName,
      email: user?.email,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      totalPrice,
      finalArea: data.area === "Other" ? data.customArea : data.area,
      paymentStatus: 'pending',
      car,
    };

    const result = await axiosInstance.post('/booking', bookingInfo);
    setBookingId(result.data.insertedId);
    setShowModal(true);
  };

  if (isLoading)
    return <Loading></Loading>

  if (isError || !car)
    return <div className="min-h-[60vh] flex items-center justify-center text-red-500">Failed to load car details</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 bg-background text-text-base">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <section className="lg:col-span-2">
          <div className="bg-surface rounded-2xl overflow-hidden shadow-md">
            <img src={car.image} alt={car.name} className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-semibold mb-2">{car.name}</h1>
            <p className="text-text-secondary text-sm mb-4">{car.brand} • {car.type} • {car.year}</p>
            <div className="flex items-center gap-2 text-yellow-500 mb-5">
              {car.rating && <p className='flex items-center'><FaStar /> <span>{car.rating}</span></p>}
              <span className="text-text-secondary">({car.available ? 'Available' : 'Unavailable'})</span>
            </div>
            <p className="text-text-secondary leading-relaxed mb-8">{car.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 bg-surface p-3 rounded-lg text-text-secondary"><FaGasPump /> {car.fuelType}</div>
              <div className="flex items-center gap-2 bg-surface p-3 rounded-lg text-text-secondary"><FaCog /> {car.transmission}</div>
              <div className="flex items-center gap-2 bg-surface p-3 rounded-lg text-text-secondary"><FaUsers /> {car.seats} Seats</div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-text-base mb-2">Features</h3>
              <ul className="flex flex-wrap gap-2 text-sm">
                {car.features?.map((feature, idx) => (
                  <li key={idx} className="bg-surface border border-border text-text-secondary px-3 py-1 rounded-full">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-surface border border-border rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-1">
              ${pickupDate && returnDate ? totalPrice : car.pricePerDay}
              <span className="text-base font-medium text-text-secondary">{pickupDate && returnDate ? " total" : " / day"}</span>
            </h2>
            <p className="text-sm text-text-secondary mb-6">Includes insurance & roadside assistance</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Pickup Date</label>
                <input
                  type="date"
                  {...register("pickupDate", { required: true })}
                  onChange={e => setPickupDate(e.target.value)}
                  className="w-full border border-border bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Return Date</label>
                <input
                  type="date"
                  min={pickupDate}
                  {...register("returnDate", { required: true })}
                  onChange={e => setReturnDate(e.target.value)}
                  className="w-full  border border-border bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className=''>
                <label className="block text-sm text-text-secondary mb-1">Area</label>
                <select className='  w-full border border-border bg-background rounded-lg px-3 py-2.5 text-sm text-text-base' {...register("area", { required: true })}>
                  <option value="">Select Area</option>
                  <option value="Mirpur">Mirpur</option>
                  <option value="Uttara">Uttara</option>
                  <option value="Dhanmondi">Dhanmondi</option>
                  <option value="Gulshan">Gulshan</option>
                  <option value="Banani">Banani</option>
                  <option value="Other">Other</option>
                </select>

                {selectedArea === "Other" && (
                  <div className="mt-3">
                    <label className="block text-sm text-text-secondary mb-1">
                      Enter Your Area
                    </label>

                    <input
                      type="text"
                      {...register("customArea", { required: true })}
                      placeholder="Type your area name"
                      className="w-full border border-border bg-background rounded-lg px-3 py-2.5 text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!user}
                className={`w-full py-2.5 rounded-lg
    ${user ? "bg-primary text-white" : "bg-gray-400 cursor-not-allowed"}`}
              >
                {user ? "Book Now" : "Login to Book"}
              </button>
            </form>

            {showModal && <Payment id={bookingId} />}

            <div className="flex items-center justify-between text-sm text-text-secondary mt-4">
              <div className="flex items-center gap-2"><FaMapMarkerAlt /> {car.location}</div>
              <div className="flex items-center gap-2"><FaCalendarAlt /> {car.year}</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
