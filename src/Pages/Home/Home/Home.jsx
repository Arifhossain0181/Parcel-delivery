import React from 'react';
import Banner from './Banner/Banner';
import OurServices from './OurServices/OurServices Section'
import LogoSlider from '../Clientlogo/LogoSlider';
import Benefits from './Benefits/Benefits';
import Bemarchnat from './Bemarchant/Bemarchnat';
import Subcard from './Subcard/Subcard';
import Customerreview from './Customerreview/Customerreview';

const Home = () => {
    return (
        <div>
         <Banner></Banner>
         <Subcard></Subcard>
         <OurServices></OurServices>
         <LogoSlider></LogoSlider>
         <Benefits></Benefits>
         <Bemarchnat></Bemarchnat>
         <Customerreview></Customerreview>
        
            
        </div>
    );
};

export default Home;