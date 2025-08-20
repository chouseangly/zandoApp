import React from 'react';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className='relative w-full h-[90vh] mx-auto mt-2'>
  
      <Image
        src="/banner.png"
        alt='banner'
        layout='fill'
        quality={100}
      />
      <div className='absolute inset-0 flex items-end justify-center p-12'>
        <div className="flex space-x-4">
          {/* 3. Add your buttons with styling */}
          <button className="border border-white bg-transparent text-white px-8 py-2 text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-300">
            SHOP MEN
          </button>
          <button className="border border-white bg-transparent text-white px-8 py-2 text-sm font-semibold hover:bg-white hover:text-black transition-colors duration-300">
            SHOP WOMEN
          </button>
        </div>
      </div>

    </div>
  );
};

export default Banner;