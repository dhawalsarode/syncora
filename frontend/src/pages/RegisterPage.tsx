import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";
import AuthLayout from "../auth/AuthLayout";
import { Toast } from "../lib/toast";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
      Toast.success("Account created successfully.");
    } catch {
      setError("Registration failed");
      Toast.error("Registration failed.");
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your Syncora workspace account."
    >
      <form
        onSubmit={submit}
        className="space-y-5"
      >
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white/70
            px-5
            py-4
            text-base
            placeholder:text-slate-400
            outline-none
            transition-all
            duration-200
            focus:border-[#6D5CFF]
            focus:ring-4
            focus:ring-[#6D5CFF]/10
          "
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white/70
            px-5
            py-4
            text-base
            placeholder:text-slate-400
            outline-none
            transition-all
            duration-200
            focus:border-[#6D5CFF]
            focus:ring-4
            focus:ring-[#6D5CFF]/10
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white/70
            px-5
            py-4
            text-base
            placeholder:text-slate-400
            outline-none
            transition-all
            duration-200
            focus:border-[#6D5CFF]
            focus:ring-4
            focus:ring-[#6D5CFF]/10
          "
        />

        <button
          className="
            w-full
            rounded-xl
            bg-[#6D5CFF]
            py-3.5
            text-base
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-[#5B4EF5]
            hover:-translate-y-0.5
            hover:shadow-lg
            active:scale-[0.98]
          "
        >
          Create Account
        </button>

        <p className="pt-2 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-semibold
              text-[#6D5CFF]
              transition-colors
              hover:text-[#5B4EF5]
            "
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;