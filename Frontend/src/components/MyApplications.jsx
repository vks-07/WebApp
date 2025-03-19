import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

const MyApplications = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-xl font-semibold">
          You have not applied for any job.
        </h1>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-semibold text-yellow-500">
              My Applications For Jobs
            </h3>
            <div className="flex flex-col gap-6">
              {applications.map((element) => {
                return (
                  <div
                    className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col gap-4"
                    key={element._id}
                  >
                    <p className="text-gray-700">
                      <span className="font-semibold">Job Title: </span>
                      {element.jobInfo.jobTitle}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Name: </span>
                      {element.jobSeekerInfo.name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Email: </span>
                      {element.jobSeekerInfo.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Phone: </span>
                      {element.jobSeekerInfo.phone}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Address: </span>
                      {element.jobSeekerInfo.address}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Cover Letter: </span>
                      <textarea
                        value={element.jobSeekerInfo.coverLetter}
                        rows={5}
                        disabled
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      ></textarea>
                    </p>
                    <div className="flex justify-end gap-4">
                      <button
                        className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-white transition"
                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete Application
                      </button>
                      <Link
                        to={
                          element.jobSeekerInfo &&
                          element.jobSeekerInfo.resume.url
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
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

export default MyApplications;
