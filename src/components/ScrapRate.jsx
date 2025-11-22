// src/components/ScrapRate.jsx
import React from 'react';
import Container from './ui/Container';

export default function ScrapRate({ searchQuery = '' }) {
  const allCategories = [
    {
      title: 'Normal Recycle',
      items: [
        { icon: '📰', name: 'Newspaper', price: '₹12/kg', desc: 'Old newspapers, magazines, office paper.' },
        { icon: '📦', name: 'Cardboard', price: '₹8/kg', desc: 'Cartons, corrugated boxes, packaging.' },
        { icon: '📄', name: 'Copy Paper', price: '₹10/kg', desc: 'Used copy paper, office paper, notebooks.' },
        { icon: '📚', name: 'Books', price: '₹6/kg', desc: 'Old books, textbooks, novels, magazines.' },
        { icon: '🧴', name: 'Plastic', price: '₹10/kg', desc: 'Bottles, containers, household plastics.' }
      ]
    },
    {
      title: 'Metals',
      items: [
        { icon: '🔩', name: 'Iron', price: '₹20/kg', desc: 'Iron scrap, old iron items, construction iron.' },
        { icon: '⚙️', name: 'Steel', price: '₹25/kg', desc: 'Steel scrap, steel utensils, construction steel.' },
        { icon: '🔧', name: 'Tungsten', price: '₹300/kg', desc: 'Tungsten scrap, tungsten tools, industrial tungsten.' },
        { icon: '🥤', name: 'Aluminium', price: '₹80/kg', desc: 'Aluminium cans, foil, utensils, scrap.' },
        { icon: '🔔', name: 'Brass', price: '₹200/kg', desc: 'Brass items, fittings, decorative brass.' },
        { icon: '🔌', name: 'Copper', price: '₹450/kg', desc: 'Copper wire, pipes, electrical copper scrap.' }
      ]
    },
    {
      title: 'Large Appliance',
      items: [
        { icon: '🧊', name: 'Refrigerator', price: '₹1,200–₹2,000/unit', desc: 'Price varies by condition, size, and brand.' },
        { icon: '🧺', name: 'Washing Machine', price: '₹800–₹1,500/unit', desc: 'Top/front load machines; functional parts fetch more.' },
        { icon: '❄️', name: 'AC', price: '₹1,500–₹3,000/unit', desc: 'Air conditioners, split units, window ACs.' },
        { icon: '🌬️', name: 'Cooler (Iron)', price: '₹500–₹800/unit', desc: 'Iron body coolers, desert coolers.' },
        { icon: '🌊', name: 'Cooler (Plastic)', price: '₹200–₹400/unit', desc: 'Plastic body coolers, portable coolers.' },
        { icon: '🔥', name: 'Geyser', price: '₹600–₹1,200/unit', desc: 'Water heaters, geysers of all types.' }
      ]
    },
    {
      title: 'Small Appliance',
      items: [
        { icon: '🍞', name: 'Microwave/Toaster', price: '₹150–₹350/unit', desc: 'Compact kitchen appliances in any condition.' },
        { icon: '🌀', name: 'Ceiling Fan', price: '₹200–₹500/unit', desc: 'Ceiling fans, table fans, exhaust fans.' },
        { icon: '🔋', name: 'Inverter & Batteries', price: '₹500–₹2,000/unit', desc: 'Inverters, UPS, car batteries, lead-acid batteries.' }
      ]
    },
    {
      title: 'Mobile & Computer',
      items: [
        { icon: '📱', name: 'Mobile Phones', price: '₹100–₹5,000/unit', desc: 'Based on model, storage, condition, accessories.' },
        { icon: '💻', name: 'Laptops/Desktops', price: '₹500–₹8,000/unit', desc: 'RAM/CPU/SSD increase buy-back value.' },
        { icon: '🖥️', name: 'Monitors', price: '₹300–₹1,200/unit', desc: 'LED monitors fetch more than old LCD/CRT.' },
        { icon: '📺', name: 'CRT TV', price: '₹200–₹500/unit', desc: 'Old CRT televisions, tube TVs.' },
        { icon: '🖨️', name: 'Printer/Scanner', price: '₹300–₹1,000/unit', desc: 'Printers, scanners, all-in-one devices.' },
        { icon: '📠', name: 'Fax Machine', price: '₹200–₹600/unit', desc: 'Fax machines, old office equipment.' }
      ]
    },
    {
      title: 'E-Waste & Electronics',
      items: [
        { icon: '🪑', name: 'E-Waste Electronics', price: 'Varies', desc: 'Batteries, cables, keyboards, electronic waste.' },
        { icon: '🔌', name: 'E-Waste Components', price: '₹50–₹200/kg', desc: 'Circuit boards, electronic components, chips.' }
      ]
    },
    {
      title: 'Automobile',
      items: [
        { icon: '🏍️', name: 'Bike', price: '₹5,000–₹15,000/unit', desc: 'Old bikes, scooters, motorcycles for scrap.' },
        { icon: '🚗', name: 'Car', price: '₹20,000–₹1,00,000/unit', desc: 'Old cars, vehicles for scrap and parts.' },
        { icon: '🔧', name: 'Automobile Parts', price: 'Varies', desc: 'Car parts, bike parts, engine parts, body parts.' }
      ]
    }
  ];

  // ------------------------
  // FILTER LOGIC
  // ------------------------
  const filterItems = (query) => {
    if (!query || query.trim() === '') return allCategories;

    const q = query.toLowerCase().trim();

    return allCategories
      .map(cat => {
        const matched = cat.items.filter(item =>
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q)
        );
        return { ...cat, items: matched };
      })
      .filter(cat => cat.items.length > 0);
  };

  const categories = filterItems(searchQuery);

  // ------------------------
  // RENDER
  // ------------------------
  return (
    <section id="scrap-rate" className="py-24 bg-gray-50 border-t border-gray-200">
      <Container scrollable maxHeight="65vh">
        <h2 className="text-3xl font-bold">Scrap Rate</h2>

        {!searchQuery ? (
          <p className="mt-3 text-gray-600">
            Browse categories. Rates are indicative and may vary by condition.
          </p>
        ) : (
          <p className="mt-3 text-gray-600">
            Search results for: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        )}

        {/* If no results */}
        {categories.length === 0 ? (
          <div className="mt-12 text-center py-12">
            <p className="text-gray-600 text-lg">
              No items found matching "{searchQuery}"
            </p>
            <p className="text-gray-500 mt-2">Try another term</p>
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.title} className="mt-10">
              <h3 className="text-2xl font-semibold">{cat.title}</h3>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((it) => (
                  <div
                    key={it.name}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-xl bg-emerald-50 flex items-center justify-center text-3xl flex-shrink-0">
                        {it.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <div className="text-lg font-semibold">{it.name}</div>
                          <div className="text-emerald-600 font-bold">{it.price}</div>
                        </div>
                        <p className="mt-1 text-gray-600 text-sm">{it.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <p className="mt-10 text-sm text-gray-500">
          Note: Rates are indicative and can vary by location and condition.
        </p>
      </Container>
    </section>
  );
}
