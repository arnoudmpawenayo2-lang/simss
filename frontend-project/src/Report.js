import axios from "axios";
import { useEffect, useState } from "react";

function Report() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

    axios.get(`${apiUrl}/report`)
      .then((response) => {
        setReport(response.data);
        setLoading(false);
      })
      .catch((err) => {
        const message = err.response
          ? `Unable to load report data (${err.response.status} ${err.response.statusText})`
          : "Unable to load report data.";
        setError(message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-112px)] flex items-center justify-center py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-slate-700">Loading report...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-112px)] flex items-center justify-center py-10">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm text-red-700">{error}</div>
      </div>
    );
  }

  const { spareSummary, spareParts = [], stockInSummary, stockOutSummary } = report || {};
  const totalTableQuantity = spareParts.reduce((sum, item) => sum + Number(item.Quantity || 0), 0);
  const totalTableValue = spareParts.reduce((sum, item) => sum + Number(item.TotalPrice || 0), 0);

  return (
    <div className="min-h-[calc(100vh-112px)] py-10">
      <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-0">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Inventory Report</h2>
          <p className="mt-2 text-sm text-slate-500">Summary of current stock, stock-in, and stock-out activity.</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Spare Parts Inventory</h3>
              <p className="mt-1 text-sm text-slate-500">Detailed spare part inventory by item.</p>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{spareParts.length} items</div>
          </div>
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-right font-medium">Quantity</th>
                <th className="px-4 py-3 text-right font-medium">Unit Price</th>
                <th className="px-4 py-3 text-right font-medium">Total Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {spareParts.map((item) => (
                <tr key={item.SparePartID} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-900">{item.SparePartID}</td>
                  <td className="px-4 py-4 text-slate-700">{item.Name}</td>
                  <td className="px-4 py-4 text-slate-700">{item.Category}</td>
                  <td className="px-4 py-4 text-right text-slate-700">{item.Quantity}</td>
                  <td className="px-4 py-4 text-right text-slate-700">${Number(item.UnitPrice).toFixed(2)}</td>
                  <td className="px-4 py-4 text-right text-slate-700">${Number(item.TotalPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 text-slate-800">
              <tr>
                <td colSpan="3" className="px-4 py-3 font-semibold">Totals</td>
                <td className="px-4 py-3 text-right font-semibold">{totalTableQuantity}</td>
                <td className="px-4 py-3 text-right font-semibold" />
                <td className="px-4 py-3 text-right font-semibold">${totalTableValue.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Spare Parts</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{spareSummary?.totalParts ?? 0}</p>
            <p className="mt-2 text-sm text-slate-500">Items in inventory catalog</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Inventory Quantity</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{spareSummary?.totalStockQuantity ?? 0}</p>
            <p className="mt-2 text-sm text-slate-500">Total quantity available</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Inventory Value</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">${Number(spareSummary?.totalStockValue ?? 0).toFixed(2)}</p>
            <p className="mt-2 text-sm text-slate-500">Total value of current stock</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Stock In Transactions</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{stockInSummary?.totalStockIn ?? 0}</p>
            <p className="mt-2 text-sm text-slate-500">Total stock-in operations</p>
            <p className="mt-4 text-sm text-slate-500">Quantity added: {stockInSummary?.totalStockInQuantity ?? 0}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Stock Out Transactions</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{stockOutSummary?.totalStockOut ?? 0}</p>
            <p className="mt-2 text-sm text-slate-500">Total stock-out operations</p>
            <p className="mt-4 text-sm text-slate-500">Value moved out: ${Number(stockOutSummary?.totalStockOutValue ?? 0).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
