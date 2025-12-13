import React, { useContext, useState } from 'react';
import {  useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from './Hook/useAxios';
import { FaStar, FaUsers, FaGasPump, FaCog, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { AuthContex } from '../Contex/AuthProvider';
import Payment from './Payment/Payment';
import { ModalContxt } from '../Contex/ModalProvider';



export default function CarDetails() {
  // const [showModal, setShowModal] = useState(false)
  const {showModal,setShowModal} = useContext(ModalContxt)
  const [bookingId, setBookingId] = useState(null);
  const axios = useAxios();
  const { id } = useParams();

  const axiosInstance = useAxios()
  const { user } = useContext(AuthContex)
  const { data: car, isLoading, isError } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const res = await axios.get(`/all-cars/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

 

  const {
    register,
    handleSubmit,


  } = useForm();


  const onSubmit = async (data) => {
    console.log(data)
    const bookingInfo = {
      name: user?.displayName,
      email: user?.email,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      paymentStatus: 'pending',
      car: car,


    };
    const result = await axiosInstance.post('/booking', bookingInfo)
    console.log(result)
     const newBookingId = result.data.insertedId;
      setBookingId(newBookingId);
    setShowModal(true)
    console.log(car._id);
 

  }
  if (isLoading)
    return <div className="min-h-[60vh] flex items-center justify-center text-text-secondary">Loading...</div>;
  if (isError || !car)
    return <div className="min-h-[60vh] flex items-center justify-center text-red-500">Failed to load car details.</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 bg-background text-text-base transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">

        <section className="lg:col-span-2">
          <div className="bg-surface rounded-2xl overflow-hidden shadow-md">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-semibold mb-2 text-text-base">{car.name}</h1>
            <p className="text-text-secondary text-sm mb-4">
              {car.brand} • {car.type} • {car.year}
            </p>

            <div className="flex items-center gap-2 text-yellow-500 mb-5">
              {
                car.rating && (<p className='flex items-center'><FaStar /> <span className="font-medium">{car.rating}</span></p>)
              }

              <span className="text-text-secondary">({car.available ? 'Available' : 'Unavailable'})</span>
            </div>

            <p className="text-text-secondary leading-relaxed mb-8">{car.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 bg-surface p-3 rounded-lg text-text-secondary">
                <FaGasPump /> <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2 bg-surface p-3 rounded-lg text-text-secondary">
                <FaCog /> <span>{car.transmission}</span>
              </div>
              <div className="flex items-center gap-2 bg-surface p-3 rounded-lg text-text-secondary">
                <FaUsers /> <span>{car.seats} Seats</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-text-base mb-2">Features</h3>
              <ul className="flex flex-wrap gap-2 text-sm">
                {car.features?.map((feature, idx) => (
                  <li
                    key={idx}
                    className="bg-surface border border-border text-text-secondary px-3 py-1 rounded-full"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>


        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-surface border border-border rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-text-base mb-1">${car.pricePerDay}
              <span className="text-base font-medium text-text-secondary"> / day</span>
            </h2>
            <p className="text-sm text-text-secondary mb-6">Includes insurance & roadside assistance</p>

            <div className="space-y-4">

              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Pickup Date</label>
                  <input
                    type="date"

                    className="w-full border border-border bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register("pickupDate", { required: true })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Return Date</label>
                  <input
                    type="date"

                    className="w-full border border-border bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register("returnDate", { required: true })}
                  />
                </div>

                <button type='submit'
                  // onClick={()=>setShowModal(true)}
                  className="w-full bg-primary  text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  Book Now
                </button>

              </form>
              {
                showModal && <Payment id={bookingId} ></Payment>
                
              }
                {/* onClose={() => setShowModal(false)} */}


              <div className="flex items-center justify-between text-sm text-text-secondary mt-4">
                <div className="flex items-center gap-2"><FaMapMarkerAlt /> {car.location}</div>
                <div className="flex items-center gap-2"><FaCalendarAlt /> {car.year}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

    </main>
  );
}
