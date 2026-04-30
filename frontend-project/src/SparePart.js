import axios from "axios";
import { useState } from "react";

function SparePart() {
  const [data, setData] = useState({
    name: "",
    category: "",
    quantity: "",
    unitPrice: ""
  });

  const handleSubmit = () => {
    axios.post("http://localhost:5000/spare", data)
      .then(res => alert(res.data.message));
  };

  return (
    <div className="min-h-[calc(100vh-112px)] flex items-center justify-center py-10">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">Add Spare Part</h2>
          <p className="mt-2 text-sm text-slate-500">Enter the details for the new spare part.</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              type="text"
              value={data.name}
              placeholder="Part name"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <input
              type="text"
              value={data.category}
              placeholder="Category"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onChange={(e) => setData({ ...data, category: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Quantity</span>
            <input
              type="number"
              value={data.quantity}
              placeholder="Quantity"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Unit Price</span>
            <input
              type="number"
              value={data.unitPrice}
              placeholder="Unit price"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onChange={(e) => setData({ ...data, unitPrice: e.target.value })}
            />
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SparePart;