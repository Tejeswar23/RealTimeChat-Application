import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="page auth-page">
      <LoginForm onSuccess={() => navigate("/chat")} />
      <p className="switch-text">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
