import React from 'react';
import './HomeFooter.css';

import logo from './../../Images/logo.png';

const HomeFooter = () => {
    return (
        <div className="homeFooter text-light">
            <div className="col-6 float-left">
                <img src={logo} width="100px"  alt="" srcset="" />
                <br /><br />
                <h2 className="text-light ml-3">University of Chittagong</h2>
            </div>
            <div className="col-6 float-left">
                <h5 className='text-light'>Important Links</h5>
                <ul>
                    <li><a href="#"><i class="fas fa-chevron-right"></i>Official University Website</a></li>
                    <li><a href="#"><i class="fas fa-chevron-right"></i>Notice Board</a></li>
                    <li><a href="#"><i class="fas fa-chevron-right"></i>Facebook Page</a></li>
                    <li><a href="#"><i class="fas fa-chevron-right"></i>Admission</a></li>
                    <li><a href="#"><i class="fas fa-chevron-right"></i>Faq</a></li>
                </ul>
            </div>
        </div>
    );
};

export default HomeFooter;