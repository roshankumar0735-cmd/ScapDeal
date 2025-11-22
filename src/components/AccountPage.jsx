import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function AccountPage({ onLogout }) {
  const user = JSON.parse(localStorage.getItem("scrap_deal_user") || "{}");

  const [scrapHistory, setScrapHistory] = useState([]);
  const [malwaHistory, setMalwaHistory] = useState([]);
  const [dealerInfo, setDealerInfo] = useState(null);

  const [open, setOpen] = useState({
    scrap: false,
    malwa: false,
    profile: false,
    dealer: false
  });

  const [editOpen, setEditOpen] = useState(false);

  const phone = user?.phone;

  /* =============================
       SCRAP HISTORY
  ============================= */
  useEffect(() => {
    if (!phone) return;

    fetch(`http://localhost:5001/api/scrap/my?phone=${phone}`)
      .then((res) => res.json())
      .then((data) => data.success && setScrapHistory(data.data));
  }, [phone]);

  /* =============================
       MALWA HISTORY (FIXED)
  ============================= */
  useEffect(() => {
    if (!phone) return;

    fetch(`http://localhost:5001/api/malwa/my?phone=${phone}&name=${user.name}&email=${user.email}`)
      .then((res) => res.json())
      .then((data) => data.success && setMalwaHistory(data.data));
  }, [phone]);

  /* =============================
       SCRAP DEALER INFO (AUTO DISPLAY)
  ============================= */
  useEffect(() => {
    if (!phone) return;

    fetch(`http://localhost:5001/api/dealer/my/${phone}`)

      .then((res) => res.json())
      .then((data) => data.success && setDealerInfo(data.data));
  }, [phone]);

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">

      {/* USER BASIC INFO */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={
              user?.photo ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name || "User"
              )}`
            }
            alt="profile"
            className="h-20 w-20 rounded-full border-2 border-green-600 object-cover"
          />
          <div>
            <h3 className="text-xl font-bold">{user?.name}</h3>
            <p className="text-gray-600">Phone: {user.phone}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            
          </div>
        </div>
      </div>

      {/* PROFILE */}
      <div className="border rounded-lg mb-3">
        <button
          onClick={() => setOpen({ ...open, profile: !open.profile })}
          className="w-full flex justify-between p-4 bg-gray-50"
        >
          <span>👤 My Profile</span>
          <span>{open.profile ? "▲" : "▼"}</span>
        </button>

        {open.profile && (
          <div className="p-3 text-sm text-gray-700 space-y-2">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Phone:</strong> {user.phone}</div>
            <div><strong>Email:</strong> {user.email}</div>

            <button
              className="mt-3 w-full rounded-md bg-blue-600 text-white py-2"
              onClick={() => setEditOpen(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* SCRAP DEALER INFO (AUTO SHOW IF EXISTS) */}
      {dealerInfo && (
        <div className="border rounded-lg mb-3">
          <button
            onClick={() => setOpen({ ...open, dealer: !open.dealer })}
            className="w-full flex justify-between p-4 bg-gray-50"
          >
            <span>🏭 Scrap Dealer Info</span>
            <span>{open.dealer ? "▲" : "▼"}</span>
          </button>

          {open.dealer && (
            <div className="p-3 text-sm text-gray-700 space-y-2">
              <div><strong>Dealer ID:</strong> {dealerInfo._id}</div>
              <div><strong>Aadhaar:</strong> {dealerInfo.aadhaar}</div>
              <div><strong>Business Type:</strong> {dealerInfo.businessType}</div>
              <div><strong>Company Name:</strong> {dealerInfo.companyName}</div>
              
              <div><strong>Annual Sales:</strong> ₹{dealerInfo.annualSales}</div>

              <div><strong>Shop Address:</strong> {dealerInfo.address}</div>
              <div><strong>Pincode:</strong> {dealerInfo.pincode}</div>
              <div><strong>District:</strong> {dealerInfo.district}</div>
              <div><strong>State:</strong> {dealerInfo.state}</div>

              <div><strong>Status:</strong> {dealerInfo.status}</div>
            </div>
          )}
        </div>
      )}

      {/* SCRAP HISTORY */}
      <div className="border rounded-lg mb-3">
        <button
          onClick={() => setOpen({ ...open, scrap: !open.scrap })}
          className="w-full flex justify-between p-4 bg-gray-50"
        >
          <span>📦 Scrap Pickup ({scrapHistory.length})</span>
          <span>{open.scrap ? "▲" : "▼"}</span>
        </button>

        {open.scrap && (
          <div className="p-3">
            {scrapHistory.length === 0 && <p>No history found.</p>}

            {scrapHistory.map((req) => (
              <div key={req._id} className="p-3 border rounded mb-3 bg-white text-sm">
                <div><strong>ID:</strong> {req._id}</div>
                <div><strong>Item:</strong> {req.itemType}</div>
                <div><strong>Quantity:</strong> {req.quantityWeight}</div>
                <div><strong>Date:</strong> {req.preferredPickupDate}</div>
                <div><strong>Status:</strong> {req.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MALWA HISTORY — FIXED */}
      <div className="border rounded-lg mb-3">
        <button
          onClick={() => setOpen({ ...open, malwa: !open.malwa })}
          className="w-full flex justify-between p-4 bg-gray-50"
        >
          <span>🚚 Malwa Truck ({malwaHistory.length})</span>
          <span>{open.malwa ? "▲" : "▼"}</span>
        </button>

        {open.malwa && (
          <div className="p-3">
            {malwaHistory.length === 0 && <p>No history found.</p>}

            {malwaHistory.map((req) => (
              <div
                key={req._id}
                className="p-3 border rounded mb-3 bg-white text-sm"
              >
                <div><strong>ID:</strong> {req._id}</div>

                <div><strong>Material:</strong> {req.materialType || "Not Provided"}</div>

                <div><strong>Truck Type:</strong> {req.truckType || "Not Provided"}</div>

                <div><strong>Pickup Location:</strong> {req.pickupLocation || "Not Provided"}</div>

                <div><strong>Date:</strong> 
                  {req.preferredDate 
                    ? `${req.preferredDate} ${req.preferredTime || ""}` 
                    : "Not Provided"}
                </div>

                <div><strong>Status:</strong> {req.status}</div>
              </div>
            ))}

          
          </div>
        )}
      </div>

      {/* LOGOUT */}
      <button
        onClick={onLogout}
        className="w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>

      {/* EDIT PROFILE MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-0 w-[90%] max-w-md">
            <EditProfileModal
              user={user}
              onClose={() => setEditOpen(false)}
              onSave={() => {
                setEditOpen(false);
                window.location.reload();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
 