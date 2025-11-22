import React, { useEffect, useState } from "react";

export default function AdminDealers() {
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/dealer/all")
      .then(res => res.json())
      .then(data => setDealers(data.dealers || []));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Registered Scrap Dealers</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Business Type</th>
              <th className="p-3">Annual Sales</th>
              <th className="p-3">Address</th>
              <th className="p-3">Call</th>
            </tr>
          </thead>

          <tbody>
            {dealers.map((d) => (
              <tr key={d._id} className="border-b">
                <td className="p-3">{d.name}</td>
                <td className="p-3">{d.phone}</td>
                <td className="p-3">{d.businessType}</td>
                <td className="p-3">{d.annualSales}</td>
                <td className="p-3">{d.address}</td>

                {/* 🔥 Call Button */}
                <td className="p-3">
                  <a
                    href={`tel:${d.phone}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    📞 Call
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
