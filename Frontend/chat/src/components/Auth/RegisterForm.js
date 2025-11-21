import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Common/Loader";

export default function RegisterForm({ onSuccess }) {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    const ok = await register(form);
    if (!ok) {
      setError("Registration failed");
    } else {
      setSuccessMsg("Registered successfully! You can login now.");
      onSuccess && onSuccess();
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p className="error-text">{error}</p>}
      {successMsg && <p className="success-text">{successMsg}</p>}
      <label>
        Username
        <input name="username" value={form.username} onChange={handleChange} required />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>
      <button className="btn primary" disabled={loading}>
        {loading ? <Loader /> : "Register"}
      </button>
    </form>
  );
}
