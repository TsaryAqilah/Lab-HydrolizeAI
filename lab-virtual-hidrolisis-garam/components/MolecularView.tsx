
import React from 'react';
import { SaltInfo } from '../types';

interface MolecularViewProps {
  salt: SaltInfo;
}

const MolecularView: React.FC<MolecularViewProps> = ({ salt }) => {
  return (
    <div className="mt-8 p-6 bg-slate-900 rounded-2xl shadow-2xl border-4 border-slate-700">
      <h3 className="text-slate-300 text-sm font-bold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        TAMPILAN MOLEKULER
      </h3>
      
      <div className="relative h-48 bg-slate-800 rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center">
        {/* Background H2O Grid (simplified) */}
        <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-20 pointer-events-none p-4">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-300 rounded-full" />
              <div className="flex gap-1 -mt-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Ions based on Salt */}
        <div className="z-10 flex gap-12 items-center">
           {/* Cation */}
           <div className="ion flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/50">
                {salt.chemicalFormula.includes('Na') ? 'Na⁺' : salt.chemicalFormula.includes('NH4') ? 'NH₄⁺' : 'Al³⁺'}
              </div>
              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-tighter">Kation</p>
           </div>

           <div className="text-slate-500 text-2xl font-light">+</div>

           {/* Anion */}
           <div className="ion flex flex-col items-center" style={{ animationDelay: '1s' }}>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/50">
                {salt.chemicalFormula.includes('Cl') ? 'Cl⁻' : salt.chemicalFormula.includes('CH3COO') ? 'Ac⁻' : 'CO₃²⁻'}
              </div>
              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-tighter">Anion</p>
           </div>
        </div>

        {/* Reaction Text Overlay */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <code className="text-xs text-blue-300 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-800">
            {salt.reaction}
          </code>
        </div>
      </div>
      
      <p className="mt-4 text-xs text-slate-400 leading-relaxed italic">
        *Visualisasi penyederhanaan: Memperlihatkan ion-ion penyusun garam yang terlarut di dalam molekul air.
      </p>
    </div>
  );
};

export default MolecularView;
