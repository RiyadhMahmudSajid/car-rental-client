import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from './Hook/useAxios';
import AllCarsCard from './AllCarsCard';


const AllCars = () => {
    const axiosInstance = useAxios()
    const [search, setSearch] = useState('');
    const { isPending, data: cars } = useQuery({
        queryFn: async () => {
            const result = await axiosInstance.get('/all-car')
            console.log(result.data)
            return result.data
        },

    })
    if (isPending) {
        return <span>Loading...</span>
    }
    const filteredCars = search
        ? cars.filter(
            (car) =>
                car.name.toLowerCase().includes(search.toLowerCase()) ||
                car.brand.toLowerCase().includes(search.toLowerCase()) ||
                car.type.toLowerCase().includes(search.toLowerCase())
        )
        : cars;
    return (
        <div className='bg-background'>
            <div className='text-center max-w-3xl mx-auto py-20 bg-border'>
                <h2 className="font-semibold text-4xl md:text-[40px] dark:text-white">Available Cars</h2>
                <p className='text-sm md:text-base text-text-secondary mt-2 max-w-140 mx-auto'>Browse our selection of premium vehicles available for your next adventure</p>

                <input
                    type="text"
                    placeholder="Search cars by name, brand, or type..."
                    className="  mx-auto bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-primary"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                
                />
            </div>
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8 w-4/5 mx-auto '>
                {
                    filteredCars?.map((car) => <AllCarsCard key={car._id} data={car}></AllCarsCard>)
                }
            </div>
        </div>

    );
};

export default AllCars;