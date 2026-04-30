import axios from "axios";
import { useState } from "react";

function Register() {
  const [data, setData] = useState({ username: "", password: "" });

  const handleRegister = () => {
    axios.post("http://localhost:5000/register", data)
      .then(res => alert(res.data.message));
  };

  return (
    <div className="min-h-[calc(100vh-112px)] flex items-center justify-center py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Register</h2>

        <div className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Username</span>
            <input
              type="text"
              value={data.username}
              placeholder="Create a username"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={data.password}
              placeholder="Create a password"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </label>

          <button
            type="button"
            onClick={handleRegister}
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;