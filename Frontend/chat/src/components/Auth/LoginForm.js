import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Common/Loader";

export default function LoginForm({ onSuccess }) {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const ok = await login(form);
    if (!ok) {
      setError("Invalid username or password");
    } else {
      onSuccess && onSuccess();
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error-text">{error}</p>}
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
        {loading ? <Loader /> : "Login"}
      </button>
    </form>
  );
}
