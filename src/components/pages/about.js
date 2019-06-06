import React from 'react';
import profilePicture from "../../../static/assets/images/bio/portrait.jpg"
import { Link } from "react-router-dom"

export default function() {
    return (
        <div className="content-page-wrapper">
            <div className="right-column">
                <div>
                    <div className="about-name">Galen Montague</div>
                    <div className="about-sub-title">Full Stack Web Developer</div>
                    <div className='about-list-wrapper'>
                        <div className="about-list-item">
                            <li className="about-bullet"></li>    
                            <p className="about-content">Passionate problem solver with full stack development capability.</p>
                        </div>
                        <div className="about-list-item">
                            <li className="about-bullet"></li>    
                            <p className="about-content">Professional design experience with dedication to pixel-perfect execution.</p>
                        </div>
                        <div className="about-list-item">
                            <li className="about-bullet"></li>    
                            <p className="about-content">Detail oriented, willing to dive into the minutiae to get it right.</p>
                        </div>
                        <div className="about-list-item">
                            <li className="about-bullet"></li>    
                            <p className="about-content">Experienced manager and positive team player.</p>
                        </div>
                        <div className="about-list-item">
                            <li className="about-bullet"></li>    
                            <p className="about-content">Conceptual thinker, naturally inquisitive. Determined to understand the whys and hows.</p>
                        </div>
                        <div className="about-list-item">
                            <li className="about-bullet"></li>    
                            <p className="about-content">Confident communicator with professional customer service experience.</p>
                        </div>

                        <div className="contact-link-wrapper">
                            <Link to="/contact" className="contact-link">Contact Me</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div
            className="left-column"
            style={{
                background: "url(" + profilePicture + ") no-repeat",
                backgroundSize: "cover",
                backgoundPosition: "center"
            }}
            />
        </div>
    );
}