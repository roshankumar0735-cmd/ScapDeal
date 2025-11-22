import React, { useState } from "react";
import Container from "./ui/Container";

export default function Header({
  onOpenLogin,
  onOpenAccount,
  onOpenSignup,
  isLoggedIn,
  onSearch,
  searchQuery
}) {
  const [open, setOpen] = useState(false);

  const user = isLoggedIn
    ? JSON.parse(localStorage.getItem("scrap_deal_user") || "{}")
    : null;

  // 🔍 Submit search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">

          {/* LOGO + BRAND */}
          <a href="#home" className="flex items-center gap-2 select-none">
            <span className="text-xl font-bold text-emerald-600">Scrap Deal</span>
            <img
              src="public/assets/logo.jpg"   // ✅ Correct path
              alt="Scrap Deal Logo"
              className="h-10 w-10 object-contain"
            />
          </a>

          {/* DESKTOP SEARCH BAR */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}   // LIVE dynamic search
              placeholder="Search items..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="submit"
              className="ml-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </form>

          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="hover:text-emerald-600">Home</a>
            <a href="#why-us" className="hover:text-emerald-600">Why Us</a>
            <a href="#scrap-rate" className="hover:text-emerald-600">Scrap Rate</a>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenAccount}
                  className="hover:text-emerald-600 font-medium"
                >
                  {user?.name ? `Hi, ${user.name.split(" ")[0]}` : "Your Account"}
                </button>

                <button onClick={onOpenAccount}>
                  <img
                    src={
                      user?.photo ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.name || "User"
                      )}&background=blue&color=fff&size=64`
                    }
                    alt="User"
                    className="h-10 w-10 rounded-full border-2 border-emerald-600 object-cover cursor-pointer hover:ring-2 hover:ring-emerald-300"
                  />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Login / Sign Up
              </button>
            )}
          </nav>

          {/* MOBILE MENU ICON */}
          <div className="flex items-center gap-2 md:hidden">
            {isLoggedIn && (
              <button onClick={onOpenAccount}>
                <img
                  src={
                    user?.photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name || "User"
                    )}&background=blue&color=fff&size=64`
                  }
                  alt="User"
                  className="h-10 w-10 rounded-full border-2 border-emerald-600 object-cover cursor-pointer"
                />
              </button>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="p-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>

        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden pb-4">

            {/* MOBILE SEARCH INPUT */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search items..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* MOBILE NAV LINKS */}
            <div className="flex flex-col gap-3">
              <a href="#home" onClick={() => setOpen(false)} className="hover:text-emerald-600">Home</a>
              <a href="#why-us" onClick={() => setOpen(false)} className="hover:text-emerald-600">Why Us</a>
              <a href="#scrap-rate" onClick={() => setOpen(false)} className="hover:text-emerald-600">Scrap Rate</a>

              {isLoggedIn ? (
                <button
                  onClick={() => { setOpen(false); onOpenAccount(); }}
                  className="hover:text-emerald-600 text-left"
                >
                  Your Account
                </button>
              ) : (
                <button
                  onClick={() => { setOpen(false); onOpenLogin(); }}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Login / Sign Up
                </button>
              )}
            </div>

          </div>
        )}

      </Container>
    </header>
  );
}
