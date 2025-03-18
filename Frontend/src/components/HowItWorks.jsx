import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <section className="py-12 px-6 sm:px-10 lg:px-20 bg-yellow-400 flex flex-col items-center gap-12">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold uppercase text-black">
        How does it work?
      </h3>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg flex flex-col items-center gap-4 transition-transform duration-300 hover:-translate-y-2 hover:bg-black hover:text-white">
          <div className="bg-black text-white p-4 rounded-full">
            <LuUserPlus className="text-3xl sm:text-4xl" />
          </div>
          <h4 className="text-xl sm:text-2xl font-medium">Create an Account</h4>
          <p className="text-gray-600 text-center">
            Sign up for a free account as a job seeker or employer. Set up your
            profile in minutes to start posting jobs or applying for jobs.
            Customize your profile to highlight your skills or requirements.
          </p>
        </div>
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg flex flex-col items-center gap-4 transition-transform duration-300 hover:-translate-y-2 hover:bg-black hover:text-white">
          <div className="bg-black text-white p-4 rounded-full">
            <VscTasklist className="text-3xl sm:text-4xl" />
          </div>
          <h4 className="text-xl sm:text-2xl font-medium">Post or Browse Jobs</h4>
          <p className="text-gray-600 text-center">
            Employers can post detailed job descriptions, and job seekers can
            browse a comprehensive list of available positions. Utilize filters
            to find jobs that match your skills and preferences.
          </p>
        </div>
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg flex flex-col items-center gap-4 transition-transform duration-300 hover:-translate-y-2 hover:bg-black hover:text-white">
          <div className="bg-black text-white p-4 rounded-full">
            <BiSolidLike className="text-3xl sm:text-4xl" />
          </div>
          <h4 className="text-xl sm:text-2xl font-medium">Hire or Get Hired</h4>
          <p className="text-gray-600 text-center">
            Employers can shortlist candidates and extend job offers. Job
            seekers can review job offers and accept positions that align with
            their career goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
