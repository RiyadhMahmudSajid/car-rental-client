import React from 'react';
import Hero from '../../Hero';
import Featured from '../../Featured';
import QualityFeatured from '../../QualityFeatured';
import Footer from '../../Footer';
import WhyChoose from '../../WhyChoose';


const Home = () => {
    return (
        <div>
           <Hero></Hero>
           <Featured></Featured>
           <QualityFeatured></QualityFeatured>
           <WhyChoose></WhyChoose>
        </div>
    );
};

export default Home;