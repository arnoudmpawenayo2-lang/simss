import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import SparePart from "./SparePart";
import StockIn from "./StockIn";
import StockOut from "./StockOut";
import StockOutForm from "./StockOutForm";
import Report from "./Report";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">SIMS System</h1>
                <p className="mt-1 text-sm text-slate-500">Spare parts inventory and stock management.</p>
              </div>
              <nav className="flex flex-wrap gap-2">
                <NavLink to="/" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  Login
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  Register
                </NavLink>
                <NavLink to="/spare" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  Spare Part
                </NavLink>
                <NavLink to="/stockin" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  Stock In
                </NavLink>
                <NavLink to="/stockout" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  Stock Out
                </NavLink>
                <NavLink to="/report" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  Report
                </NavLink>
              </nav>
            </div>
          </header>

          <main className="space-y-6">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/spare" element={<SparePart />} />
              <Route path="/stockin" element={<StockIn />} />
              <Route path="/stockout" element={<StockOut />} />
              <Route path="/stockout/add" element={<StockOutForm />} />
              <Route path="/stockout/edit/:id" element={<StockOutForm />} />
              <Route path="/report" element={<Report />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;