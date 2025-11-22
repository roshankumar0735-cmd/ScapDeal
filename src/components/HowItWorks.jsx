import React from 'react';
import Container from './ui/Container';

export default function HowItWorks() {
  const steps = [
    { icon: '📆', title: 'Schedule Pickup', desc: 'Pick a date & time that suits you.' },
    { icon: '📍', title: 'Pickup at Your Address', desc: 'Our executive visits and weighs items.' },
    { icon: '💵', title: 'Receive Payment', desc: 'Instant cash or UPI transfer on completion.' }
  ];
  return (
    <section id="how-it-works" className="py-24 bg-gray-50 border-t border-gray-200">
      <Container>
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">{s.icon}</div>
              <div className="mt-4 text-xl font-semibold">{s.title}</div>
              <div className="mt-1 text-gray-600">{s.desc}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
