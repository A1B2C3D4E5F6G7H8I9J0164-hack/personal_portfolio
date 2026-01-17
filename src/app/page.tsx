import SplineScene from '@/components/SplineScene';
// import AboutSplineScene from '@/components/AboutSplineScene';
import HomeClient from '@/components/HomeClient';
import { Suspense } from 'react';

export default function Home() {
  return (
    <HomeClient
      splineSlot={
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" /></div>}>
          <SplineScene />
        </Suspense>
      }
      aboutSplineSlot={
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Replaced Spline with Globe Image - Simple Circular Crop */}
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] animate-pulse-slow rounded-full overflow-hidden">
            <img
              src="/planet.png"
              alt="Globe"
              className="w-full h-full object-cover opacity-90 scale-105"
            />
          </div>
        </div>
      }
    />
  );
}
