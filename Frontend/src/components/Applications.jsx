import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-2xl font-bold">You have no applications from job seekers.</h1>
      ) : (
        <>
          <div className="flex flex-col gap-8 w-full min-h-[400px]">
            <h3 className="text-3xl font-semibold text-yellow-500">Applications For Your Posted Jobs</h3>
            <div className="flex flex-col gap-8">
              {applications.map((element) => {
                return (
                  <div className="bg-gray-300 p-6 rounded-lg" key={element._id}>
                    <p className="flex flex-col gap-1 text-lg text-gray-500">
                      <span className="font-semibold text-xl text-black">Job Title: </span> {element.jobInfo.jobTitle}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-500">
                      <span className="font-semibold text-xl text-black">Applicant's Name: </span>{" "}
                      {element.jobSeekerInfo.name}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-500">
                      <span className="font-semibold text-xl text-black">Applicant's Email:</span>{" "}
                      {element.jobSeekerInfo.email}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-500">
                      <span className="font-semibold text-xl text-black">Applicant's Phone: </span>{" "}
                      {element.jobSeekerInfo.phone}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-500">
                      <span className="font-semibold text-xl text-black">Applicant's Address: </span>{" "}
                      {element.jobSeekerInfo.address}
                    </p>
                    <p className="flex flex-col gap-1 text-lg text-gray-500">
                      <span className="font-semibold text-xl text-black">Applicant's CoverLetter: </span>
                      <textarea
                        value={element.jobSeekerInfo.coverLetter}
                        rows={5}
                        disabled
                        className="bg-transparent text-lg"
                      ></textarea>
                    </p>
                    <div className="flex justify-end gap-5">
                      <button
                        className="bg-transparent text-yellow-500 border border-yellow-500 py-2 px-4 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300 cursor-pointer"
                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete Application
                      </button>
                      <Link
                        to={
                          element.jobSeekerInfo &&
                          element.jobSeekerInfo.resume.url
                        }
                        className="bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg hover:bg-black hover:text-white transition duration-300 cursor-pointer"
                        target="_blank"
                      >
                        View Resume
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Applications;
