import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { CiCircleInfo } from "react-icons/ci";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Raipur",
  ];

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handlePostJob = (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    offers && formData.append("offers", offers);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    hiringMultipleCandidates &&
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    personalWebsiteTitle &&
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    personalWebsiteUrl &&
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="flex flex-col gap-8 p-8 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-yellow-500">Post A Job</h3>
      <div className="flex flex-col gap-4">
        <label className="font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-medium">Job Type</label>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-medium">Location (City)</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Select Location</option>
          {cities.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-medium">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-medium">Company/Job Introduction</label>
        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Company / Job Introduction"
          rows={7}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-medium">Responsibilities</label>
        <textarea
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          placeholder="Job Responsibilities"
          rows={7}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-medium">Qualifications</label>
        <textarea
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          placeholder="Required Qualifications For Job"
          rows={7}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="font-medium">What We Offer</label>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <CiCircleInfo /> Optional
          </span>
        </div>
        <textarea
          value={offers}
          onChange={(e) => setOffers(e.target.value)}
          placeholder="What are we offering in return!"
          rows={7}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-medium">Job Niche</label>
        <select
          value={jobNiche}
          onChange={(e) => setJobNiche(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Select Job Niche</option>
          {nichesArray.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-medium">Salary</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="50000 - 800000"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="font-medium">Hiring Multiple Candidates?</label>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <CiCircleInfo /> Optional
          </span>
        </div>
        <select
          value={hiringMultipleCandidates}
          onChange={(e) => setHiringMultipleCandidates(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Hiring Multiple Candidates?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="font-medium">Personal Website Name</label>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <CiCircleInfo /> Optional
          </span>
        </div>
        <input
          type="text"
          value={personalWebsiteTitle}
          onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
          placeholder="Personal Website Name/Title"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="font-medium">Personal Website Link (URL)</label>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <CiCircleInfo /> Optional
          </span>
        </div>
        <input
          type="text"
          value={personalWebsiteUrl}
          onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
          placeholder="Personal Website Link (URL)"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="flex justify-center">
        <button
          className="btn"
          onClick={handlePostJob}
          disabled={loading}
        >
          Post Job
        </button>
      </div>
    </div>
  );
};

export default JobPost;
