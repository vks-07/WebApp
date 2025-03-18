import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center mx-auto gap-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-center">
        Find Your Dream Job Today
      </h1>
      <h4 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-500 text-center">
        Connecting Talent with Opportunities Across the Nation for Every Skill Level
      </h4>
      <div className="max-w-4xl text-center bg-yellow-400 text-black p-8 sm:p-10 lg:p-12 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:bg-black hover:text-white">
        Explore a vast array of job listings in diverse industries. Whether
        you're a seasoned professional or just starting out, find the perfect
        role to advance your career. Our platform makes job searching easy and
        efficient, bringing you closer to your next big opportunity.
      </div>
    </section>
  );
};

export default Hero;
