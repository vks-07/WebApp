import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdatePassword = () => {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated");
    //   console.log("password updated");

      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    //   navigate("/dashboard");
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <div className="account_components update_password_component">
      <h3>Update Password</h3>
      <div>
        <label>Current Password</label>
        <input
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        {showOldPassword ? (
          <FaRegEyeSlash
            className="eye_icon cursor-pointer"
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        ) : (
          <FaEye
            className="eye_icon cursor-pointer"
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        )}
      </div>
      <div>
        <label>New Password</label>
        <input
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {showNewPassword ? (
          <FaRegEyeSlash
            className="eye_icon cursor-pointer"
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        ) : (
          <FaEye
            className="eye_icon cursor-pointer"
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        )}
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {showConfirmPassword ? (
          <FaRegEyeSlash
            className="eye_icon cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        ) : (
          <FaEye
            className="eye_icon cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        )}
      </div>
      <div className="save_change_btn_wrapper">
        <button
          className="btn"
          onClick={handleUpdatePassword}
          disabled={loading}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
