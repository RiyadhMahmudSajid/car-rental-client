import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from './Hook/useAxios';
import FeaturedCard from './FeaturedCard';
import { GoArrowRight } from 'react-icons/go';
import { Link } from 'react-router';

const Featured = () => {

    const axiosSecure = useAxios()
    const { data: Cars = [] } = useQuery({
        queryKey: ['allCar'],
        queryFn: async () => {
            const result = await axiosSecure.get('/all-car')
            console.log(result.data)
            return result.data.slice(0, 6)
        }
    })
    return (
        <div className='bg-background py-24'>
            <div className='max-w-3xl  mx-auto px-6 mb-12 text-center '>
                <h2 className='text-black dark:text-white text-4xl md:text-[40px]  font-extrabold tracking-tight mb-2'>Our Vehicle Fleet</h2>
                <p className='text-text-secondary text-sm md:text-base tracking-wider'>Choose from our wide selection of premium vehicles</p>
            </div>
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8 w-4/5 mx-auto '>
                {
                    Cars?.map((car) => {
                        return <FeaturedCard key={car._id} car={car}></FeaturedCard>
                    })
                }
            </div>
            <div className='mt-18  text-center cursor-pointer rounded-md  flex justify-center '>
                <button className='cursor-pointer text-center  rounded-md border border-primary text-primary px-6 py-2  '><Link to='/all-car' className='flex justify-center items-center'>Explore all cars <GoArrowRight className='ml-2'  /></Link></button>
            </div>
        </div>
    );
};

export default Featured;