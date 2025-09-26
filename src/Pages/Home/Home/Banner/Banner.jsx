import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import logo1 from '../../../../assets/banner/banner1.png'
import logo2 from '../../../../assets/banner/banner2.png'
import logo3 from '../../../../assets/banner/banner3.png'   
const Banner = () => {
    return (
        <div>
             <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} interval={6000}>
                <div>
                    <img src={logo1} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={logo2} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={logo3} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        
        </div>
    );
};

export default Banner;