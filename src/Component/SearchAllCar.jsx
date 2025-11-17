import React, { useState } from 'react';
import useAxios from './Hook/useAxios';
import { useQuery } from '@tanstack/react-query';

const SearchAllCar = () => {
    const axiosSecure = useAxios();
    const [search, setSearch] = useState('');

    const { data: cars = [] } = useQuery({
        queryKey: ['allCar'],
        queryFn: async () => {
            const result = await axiosSecure.get('/all-car');
            return result.data;
        },
    });

    const filteredCars = ((car)=>
     car.name.toLowerCase().inCludes(search.toLowerCase()) ||
     car.brand.toLowerCase().inCludes(search.toLowerCase()) ||
     car.type.toLowerCase().inCludes(search.toLowerCase())
    
    );

    return (
        <div className='max-w-7xl mx-auto'>
            <div>
                <h2>Available Cars</h2>
                <p>Browse our selection of premium vehicles available for your next adventure</p>
            </div>
            <input
                type="text"
                placeholder="Search cars by name, brand, or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full mb-6"
            />
        </div>
    );
};

export default SearchAllCar;