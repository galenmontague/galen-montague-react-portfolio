import React from 'react';

export default function() {
    return (
        <div className="content-page-wrapper">
            <div className="right-column">
                bio, list of skills, experiences
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div
            className="left-column"
            style={{
                background: "url(assets/images/bio/portrait.jpg) no-repeat",
                backgroundSize: "cover",
                backgoundPosition: "center"
            }}
            />
        </div>
    );
}