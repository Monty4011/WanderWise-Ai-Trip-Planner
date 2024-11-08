import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551]">The Smartest Way to Travel</span>
        <br /> AI-Powered Itineraries Tailored for You!
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Effortlessly plan your dream trip with AI-crafted itineraries tailored
        to your preferences, budget, and schedule. Discover, book, and go!
      </p>
      <Link to={'/create-trip'}>
      <Button>Get Started, It's Free</Button>
      </Link>
      <img src="/landing.png" className="-mt-20" />
    </div>
  );
};

export default Hero;
