import React from 'react';
import Container from './ui/Container';

export default function Hero({ onOpenSchedule, onOpenCheck, userName }) {
  return (
    <section id="home" className="relative overflow-hidden">
      <Container>
        <div className="py-24 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-emerald-600 mb-2">Nice to see you{userName ? `, ${userName}` : ''}!</h2>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Cash Your Scrap,with <span className="text-emerald-600">Scrap Deal</span>
            </h1>
            <p className="mt-5 text-lg text-gray-600">Fast pickups, transparent scrap rates, and hassle-free recycling.</p>
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-emerald-800 font-semibold text-center">♻️ Reuse • Recycle • Reduce • Earn with Scrap Deal</p>
            </div>
            <div className="mt-6 w-full max-w-xl rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <img
                src="assets/SD .png"
                alt="Scrap Deal - Recycling and Greenery"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = 'assets/SD.png';
                }}
              />
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white shadow p-6 md:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Schedule & Track</h3>
            </div>
            <div className="mt-4 w-full bg-gray-100 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center">
              <img
                src="assets/Taaraju .png"
                alt="Schedule a Pickup"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.target.src = '/assets/Taaraju.png';
                }}
              />
            </div>
            <p className="mt-4 text-gray-600">Book a pickup in seconds and track it anytime.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={onOpenSchedule} className="rounded-md bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700">Schedule a Pickup</button>
              <button onClick={onOpenCheck} className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100">Check My Pickup</button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
