import React, { useState } from 'react';

const HomePage = ({}) => {

    const Download = () => {
    };

    return (
        <div className="HomePage">
            {/*Add thee landing page html here and modify components as needed */}
            <section class="hero">
		        <div class="backgroundImage" style={{backgroundImage: "url('./public/assets/img/bay2.jpg')"}}></div>
		        <h1>Welcome to Klout</h1>
		        <h3>Your personal social media manager</h3>
		        <a href="https://clout.net/" class="btn">Download The App! </a>
	        </section>
        </div>
    );
};
  
export default HomePage;