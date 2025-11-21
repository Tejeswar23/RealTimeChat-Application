import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/Auth/RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="page auth-page">
      <RegisterForm onSuccess={() => {}} />
      <p className="switch-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <button className="btn link-btn" onClick={() => navigate("/login")}>
        Go to Login
      </button>
    </div>
  );
}
