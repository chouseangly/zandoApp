"use client";

import React, { useState } from 'react';

// --- Reusable SVG Icons ---
// Using inline SVGs keeps the component self-contained.

const ChevronDownIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const DeliveryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
        <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
        <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h4"></path><path d="M16 18a4 4 0 0 0-8 0"></path><path d="M12 14v4"></path><path d="M12 12h.01"></path>
    </svg>
);

const PaymentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M2 11h20"></path>
    </svg>
);

// --- Reusable Accordion Component ---
// This component manages the open/close state for each dropdown.
const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        <ChevronDownIcon className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen pb-4' : 'max-h-0'}`}
      >
        <div className="text-gray-600 text-sm space-y-2">
            {children}
        </div>
      </div>
    </div>
  );
};

// --- Main Product Info Component ---
// This brings all the pieces together.
const ProductInfo = () => {
  return (
    <div className="w-full mx-auto bg-slate-100 font-sans p-4 mt-5 rounded-lg">
      
      {/* Top Section with Features */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-8 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <DeliveryIcon />
            <div>
                <p className="font-semibold text-sm text-gray-800">Fast Delivery</p>
                <p className="text-xs text-gray-500">From 1 - 3 days</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SupportIcon />
            <div>
                <p className="font-semibold text-sm text-gray-800">Support hotline</p>
                <p className="text-xs text-gray-500">(+855) 081 999 716</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PaymentIcon />
            <div>
                <p className="font-semibold text-sm text-gray-800">Easy payment</p>
                <p className="text-xs text-gray-500">Many forms</p>
            </div>
          </div>
      </div>

      {/* Accordion Sections */}
      <AccordionItem title="Model info">
        <p>Model is 176 cm tall / 66 kg weight and is wearing size M.</p>
      </AccordionItem>

      <AccordionItem title="Product details">
        <p>Code. 21224121047</p>
        <p>Unisex t-shirt featuring short sleeves with front printed and v-neck.</p>
      </AccordionItem>

      {/* Link Sections */}
      <a href="/size-guide" className="w-full flex justify-between items-center py-4 border-b border-gray-200 cursor-pointer group">
        <span className="font-semibold text-gray-800 group-hover:text-black">Size guide</span>
        <ChevronRightIcon />
      </a>

      <a href="/exchange-policy" className="w-full flex justify-between items-center py-4 cursor-pointer group">
        <span className="font-semibold text-gray-800 group-hover:text-black">Online exchange policy</span>
        <ChevronRightIcon />
      </a>
    </div>
  );
};

export default ProductInfo;