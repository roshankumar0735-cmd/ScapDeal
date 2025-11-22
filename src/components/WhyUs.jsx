import React from 'react';
import Container from './ui/Container';

export default function WhyUs() {
  const features = [
    { icon: '🔍', title: 'Transparent Rates', desc: 'See current scrap prices upfront.' },
    { icon: '⚡', title: 'Fast Pickup', desc: 'Schedule pickups that suit your time.' },
    { icon: '📱', title: 'Easy Tracking', desc: 'Check your pickup status anytime.' },
    { icon: '🛡️', title: 'Verified Partners', desc: 'Background-verified executives and safe handling.' },
    { icon: '🌿', title: 'Eco-Friendly Disposal', desc: 'Responsible recycling with certified centers.' },
    { icon: '💳', title: 'Secure Payments', desc: 'Instant UPI or cash—your choice.' }
  ];
  return (
    <section id="why-us" className="py-24 bg-white border-t border-gray-200">
      <Container>
        <h2 className="text-3xl font-bold">Why Us</h2>
        <p className="mt-3 text-gray-600">We focus on convenience, transparency, and sustainability.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">{f.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
