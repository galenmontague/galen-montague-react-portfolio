import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import contactPagePicture from "../../../static/assets/images/auth/login.jpg";
 

export default function() {
    return (  
        <div className="content-page-wrapper">
            <div
            className="left-column"
            style={{
                background: "url(" + contactPagePicture + ") no-repeat",
                backgroundSize: "cover",
                backgoundPosition: "center"
            }}
            />
            <div className="right-column">
                <div className="contact-bullet-points">
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="phone" />
                        </div>

                        <div className="text">208-954-6828</div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="envelope" />
                        </div>

                        <div className="text">
                            <a className="mailto" href="mailto:galen.montague@gmail.com">galen.montague@gmail.com</a>
                        </div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="map-marked-alt" />
                        </div>

                        <div className="text">Lehi, UT</div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon={["fab", "linkedin"]} />
                        </div>

                        <div className="text">
                            <a className="linkedIn" href="https://www.linkedin.com/in/galen-montague-1097b147/" target="_blank">Galen Montague</a></div>
                    </div>
                </div>
            </div>
        </div>
    );
}