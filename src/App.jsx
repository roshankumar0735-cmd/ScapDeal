// FINAL FIXED App.jsx (with dynamic search + auto scroll)

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import ScrapRate from "./components/ScrapRate";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import Modal from "./components/Modal";

import Login from "./components/ui/Login";
import Signup from "./components/ui/Signup";
import AccountPage from "./components/AccountPage";

import { CheckForm, SellingForm, TruckBookingForm } from "./components/forms/Forms";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./admin/AdminRoute";

import DealerRegister from "./components/forms/DealerRegister";

export default function App() {
  const [openModal, setOpenModal] = useState(null);
    // Allow child components to open modals
  window.openLoginModal = () => setOpenModal("login");
  window.openSignupModal = () => setOpenModal("signup");

  const [newId, setNewId] = useState("");
  const [requestType, setRequestType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);


  const handleChatbotService = (service) => {
    if (service === "scrap") setOpenModal("scrap");
    if (service === "truck") setOpenModal("truck");
    if (service === "donate") setOpenModal("dealer"); 
    if (service === "repair") alert("Repair form not added yet"); // or open modal
  };

  
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    localStorage.getItem("scrap_deal_user") ? true : false
  );

  const user = isLoggedIn
    ? JSON.parse(localStorage.getItem("scrap_deal_user") || "{}")
    : null;

  // ⭐ NEW AUTO SCROLL ON SEARCH
  const handleSearch = (query) => {
    setSearchQuery(query || "");

    if (query && query.trim().length > 0) {
      const rateSection = document.getElementById("scrap-rate");
      if (rateSection) rateSection.scrollIntoView({ behavior: "smooth" });
    } else {
      const home = document.getElementById("home");
      if (home) home.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openDealer = () => {
    if (!isLoggedIn) {
      alert("You must login first.");
      setOpenModal("login");
      return;
    }
    setOpenModal("dealer");
  };
  const openSchedule = () => {
    if (!isLoggedIn) {
      alert("You must login first.");
      setOpenModal("login");
      return;
    }
    setOpenModal("scrap");
  };
  const openCheck = () => setOpenModal("check");
  const openScrap = () => {
    if (!isLoggedIn) {
      alert("You must login first.");
      setOpenModal("login");
      return;
    }
    setOpenModal("scrap");
  };
  const openTruck = () => {
    if (!isLoggedIn) {
      alert("You must login first.");
      setOpenModal("login");
      return;
    }
    setOpenModal("truck");
  };
  const openLogin = () => setOpenModal("login");
  const openSignup = () => setOpenModal("signup");
  const openAccount = () => setOpenModal("account");

  const close = () => {
    setOpenModal(null);
    setRequestType("");
  };

  const handleLogout = () => {
    localStorage.removeItem("scrap_deal_user");
    localStorage.removeItem("scrap_deal_token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const getSuccessMessage = () => {
    if (requestType === "Selling")
      return "Your scrap pickup request has been submitted!";
    if (requestType === "Truck Booking")
      return "Your truck booking has been submitted!";
    return "Your request has been submitted!";
  };

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            <>
              <Header
                onOpenLogin={openLogin}
                onOpenAccount={openAccount}
                onOpenSignup={openSignup}
                isLoggedIn={isLoggedIn}
                onSearch={handleSearch}
                searchQuery={searchQuery}
              />

              <main>
                <div id="home">
                  <Hero
                    onOpenSchedule={openSchedule}
                    onOpenCheck={openCheck}
                    userName={user?.name}
                  />
                </div>

                <Services
                  onOpenScrap={openScrap}
                  onOpenTruck={openTruck}
                  onOpenDealer={openDealer}
                />

                <HowItWorks />
                <WhyUs />

                {/* ⭐ Wrapped with ID */}
                <div id="scrap-rate">
                  <ScrapRate searchQuery={searchQuery} />
                </div>
              </main>

              <Footer />

              <div className="fixed right-10 bottom-10 flex flex-col gap-5">
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="h-14 w-14 bg-indigo-600 text-white rounded-full shadow-lg text-2xl"
                >
                  👨🏻‍💻
                </button>

                <a
                  href="https://wa.me/918368293101"
                  target="_blank"
                  className="h-14 w-14 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl"
                >
                  W
                </a>

                <a
                  href="tel:+918368293101"
                  className="h-14 w-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl"
                >
                  📞
                </a>
              </div>

              {chatOpen && (
                <AIChatbot
                onClose={() => setChatOpen(false)}
                onOpenService={handleChatbotService}
              />
              )}

              <Modal title="Login" open={openModal === "login"} onClose={close}>
                <Login
                  onLoginSuccess={() => {
                    setIsLoggedIn(true);
                    close();
                  }}
                  onClose={close}
                  onOpenSignup={openSignup}
                />
              </Modal>

              <Modal title="Sign Up" open={openModal === "signup"} onClose={close}>
                <Signup
                  onSuccess={() => {
                    close();
                    setOpenModal("login");   // ⭐ open login automatically
                  }}
                  
                  onClose={close}
                />
              </Modal>

              <Modal title="Your Account" open={openModal === "account"} onClose={close}>
                <AccountPage onLogout={handleLogout} />
              </Modal>

              <Modal title="Scrap Dealer Registration" open={openModal === "dealer"} onClose={close}>
                <DealerRegister onClose={close} />
              </Modal>

              <Modal title="Scrap Pickup Request" open={openModal === "scrap"} onClose={close}>
                <SellingForm
                  onDone={(id) => {
                    setNewId(id);
                    setRequestType("Selling");
                    setOpenModal("done");
                  }}
                />
              </Modal>

              <Modal title="Check My Pickup" open={openModal === "check"} onClose={close}>
                <CheckForm />
              </Modal>

              <Modal title="Truck Booking" open={openModal === "truck"} onClose={close}>
                <TruckBookingForm
                  onDone={(id) => {
                    setNewId(id);
                    setRequestType("Truck Booking");
                    setOpenModal("done");
                  }}
                />
              </Modal>

              <Modal title="Done!" open={openModal === "done"} onClose={close}>
                <p className="text-green-700 font-semibold">{getSuccessMessage()}</p>
                <p>Your Request ID: <strong>{newId}</strong></p>
              </Modal>
            </>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
