import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StockOut() {
  const [list, setList] = useState([]);

  const loadData = () => {
    axios.get("http://localhost:5000/stockout")
      .then(res => setList(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/stockout/${id}`)
      .then(() => loadData());
  };

  return (
    <div className="min-h-[calc(100vh-112px)] py-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Stock Out List</h2>
            <p className="mt-1 text-sm text-slate-500">Review and manage outgoing stock records.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/stockout/add"
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Add Stock Out
            </Link>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{list.length} record{list.length === 1 ? '' : 's'}</div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Qty</th>
                <th className="px-4 py-3 text-left font-medium">Total</th>
                <th className="px-4 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {list.length > 0 ? (
                list.map(item => (
                  <tr key={item.StockOutID} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{item.StockOutID}</td>
                    <td className="px-4 py-4 text-slate-700">{item.StockOutQuantity}</td>
                    <td className="px-4 py-4 text-slate-700">{item.StockOutTotalPrice}</td>
                    <td className="px-4 py-4 flex flex-wrap gap-2">
                      <Link
                        to={`/stockout/edit/${item.StockOutID}`}
                        className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.StockOutID)}
                        className="rounded-xl bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-slate-500">
                    No stock out records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StockOut;