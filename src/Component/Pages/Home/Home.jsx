import React from 'react';
import Hero from '../../Hero';
import Featured from '../../Featured';
import QualityFeatured from '../../QualityFeatured';


const Home = () => {
    return (
        <div>
           <Hero></Hero>
           <Featured></Featured>
           <QualityFeatured></QualityFeatured>
        </div>
    );
};

export default Home;