import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="account_components">
      <h3>My Profile</h3>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          disabled
          value={user && user.name}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          disabled
          value={user && user.email}
          onChange={(e) => e.target.value}
        />
      </div>
      {user && user.role === "Job Seeker" && (
        <div>
          <label>My Preferred Job Niches</label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              disabled
              value={user && user.niches.firstNiche}
              onChange={(e) => e.target.value}
            />
            <input
              type="text"
              disabled
              value={user && user.niches.secondNiche}
              onChange={(e) => e.target.value}
            />
            <input
              type="text"
              disabled
              value={user && user.niches.thirdNiche}
              onChange={(e) => e.target.value}
            />
          </div>
        </div>
      )}
      <div>
        <label>Phone Number</label>
        <input
          type="number"
          disabled
          value={user && user.phone}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          disabled
          value={user && user.address}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Role</label>
        <input
          type="text"
          disabled
          value={user && user.role}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Joined On</label>
        <input
          type="text"
          disabled
          value={user?.createdAt?.substring(0, 10) || ""} // optional chaining
          onChange={(e) => e.target}
        />
      </div>
      <div>
        {user && user.resume && (
          <div>
            <p>Current Resume:</p>
            <Link
              to={user.resume && user.resume.url}
              target="_blank" //new tab me open hoga
              className="view-resume"
            >
              View Resume
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
