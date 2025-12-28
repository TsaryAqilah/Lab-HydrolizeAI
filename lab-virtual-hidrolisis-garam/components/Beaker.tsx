
import React from 'react';
import { getPHColor } from '../constants';
import { SaltInfo } from '../types';

interface BeakerProps {
  salt: SaltInfo | null;
  isDissolving: boolean;
  showPHMeter: boolean;
}

const Beaker: React.FC<BeakerProps> = ({ salt, isDissolving, showPHMeter }) => {
  const liquidColor = salt && showPHMeter ? getPHColor(salt.ph) : 'rgba(186, 230, 253, 0.4)';

  return (
    <div className="relative flex flex-col items-center justify-center h-80 w-64 mx-auto mt-12">
      {/* Beaker Body */}
      <div className="relative w-48 h-64 border-4 border-slate-300 border-t-0 rounded-b-3xl overflow-hidden shadow-inner bg-white/30">
        {/* Liquid */}
        <div 
          className="absolute bottom-0 w-full transition-all duration-1000 ease-in-out"
          style={{ 
            height: isDissolving || salt ? '75%' : '0%', 
            backgroundColor: liquidColor,
            opacity: 0.6
          }}
        >
          {/* Bubbles / Particles when dissolving */}
          {isDissolving && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute bg-white/60 rounded-full animate-bounce"
                  style={{
                    width: Math.random() * 8 + 2 + 'px',
                    height: Math.random() * 8 + 2 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 2 + 's',
                    animationDuration: Math.random() * 1 + 1 + 's'
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Measuring Marks */}
        <div className="absolute left-0 top-0 h-full w-4 flex flex-col justify-between py-4 text-[10px] text-slate-400 font-mono">
          <span>250ml</span>
          <span>200ml</span>
          <span>150ml</span>
          <span>100ml</span>
          <span>50ml</span>
        </div>
      </div>

      {/* Lab Stand (Implicit) */}
      <div className="w-64 h-4 bg-slate-200 rounded-full mt-2 shadow-sm" />

      {/* Labels */}
      <div className="absolute -top-8 text-center">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Wadah Reaksi</h3>
      </div>

      {/* PH Probe Visual */}
      {showPHMeter && salt && (
        <div className="absolute -top-12 right-0 w-2 h-40 bg-slate-400 rounded-full shadow-lg transform rotate-12 transition-all duration-500">
          <div className="absolute bottom-0 w-full h-8 bg-slate-600 rounded-b-full" />
          <div className="absolute -top-4 -right-12 bg-slate-800 text-white px-2 py-1 rounded text-xs font-mono shadow-xl border border-slate-600">
            pH: {salt.ph.toFixed(1)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Beaker;
