import React from 'react';
import Hero from '../../Hero';
import Featured from '../../Featured';
import QualityFeatured from '../../QualityFeatured';
import Footer from '../../Footer';


const Home = () => {
    return (
        <div>
           <Hero></Hero>
           <Featured></Featured>
           <QualityFeatured></QualityFeatured>
           <Footer></Footer>
        </div>
    );
};

export default Home;