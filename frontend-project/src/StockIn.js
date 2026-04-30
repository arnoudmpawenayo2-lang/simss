import axios from "axios";
import { useState } from "react";

function StockIn() {
  const [data, setData] = useState({
    sparePartID: "",
    quantity: "",
    date: ""
  });

  const handleSubmit = () => {
    axios.post("http://localhost:5000/stockin", data)
      .then(res => alert(res.data.message));
  };

  return (
    <div className="min-h-[calc(100vh-112px)] flex items-center justify-center py-10">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">Stock In</h2>
          <p className="mt-2 text-sm text-slate-500">Record incoming inventory for spare parts.</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">SparePart ID</span>
            <input
              type="text"
              value={data.sparePartID}
              placeholder="Enter spare part ID"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onChange={(e) => setData({ ...data, sparePartID: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Quantity</span>
            <input
              type="number"
              value={data.quantity}
              placeholder="Enter quantity"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Date</span>
            <input
              type="date"
              value={data.date}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onChange={(e) => setData({ ...data, date: e.target.value })}
            />
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockIn;