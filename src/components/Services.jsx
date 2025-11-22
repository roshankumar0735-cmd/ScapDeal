import React from 'react';
import Container from './ui/Container';

export default function Services({ onOpenScrap, onOpenTruck, onOpenDealer }) {

  const services = [
    { 
      icon: '🟢', 
      title: 'Scrap Pickup', 
      desc: 'Sell your scrap items and get the best rates. Fast pickup and instant payment with real-time pricing.',
      iconBg: 'bg-green-100',
      onClick: onOpenScrap
    },
    { 
      icon: '🚛', 
      title: 'Book a Truck for Construction Malwa', 
      desc: 'Book trucks for construction material transport, debris removal, and bulk item movement.',
      iconBg: 'bg-orange-100',
      onClick: onOpenTruck
    },
    { 
      icon: '🧑‍🏭', 
      title: 'Register as Scrap Dealer', 
      desc: 'Formalise your scrap business — register your kabadi shop or recycling business to receive verified pickups, growth tools and digital records.',
      iconBg: 'bg-gray-100',
      onClick: onOpenDealer   // ⭐ UPDATED HERE
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50 border-t border-gray-200">
      <Container>
        <h2 className="text-3xl font-bold text-center">Our Services</h2>
        <p className="mt-3 text-gray-600 text-center">
          Choose the service that best fits your needs. Use our AI chatbot to find the right category!
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              onClick={service.onClick}
              className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl cursor-pointer transition-all hover:scale-105 flex flex-col"
            >
              <div className={`h-16 w-16 rounded-2xl ${service.iconBg} flex items-center justify-center text-3xl mb-4`}>
                {service.icon}
              </div>

              <h3 className="text-xl font-bold mb-2">{service.title}</h3>

              <p className="text-gray-600 mb-4 text-sm">{service.desc}</p>

              <button
                onClick={service.onClick}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold text-sm shadow hover:bg-blue-700 mt-auto"
              >
                Get Started
              </button>

            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
