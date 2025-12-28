
import React, { useState, useCallback } from 'react';
import { SALTS } from './constants';
import { SaltInfo, SimulationState } from './types';
import Beaker from './components/Beaker';
import MolecularView from './components/MolecularView';
import { getSaltExplanation } from './services/geminiService';
import { FlaskConical, Thermometer, Microscope, Info, Sparkles, RefreshCcw, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<SimulationState>({
    selectedSalt: null,
    isDissolving: false,
    showPHMeter: false,
    showMolecularView: false,
    aiExplanation: '',
    isLoadingAI: false,
  });

  const handleSaltSelect = (salt: SaltInfo) => {
    setState(prev => ({
      ...prev,
      selectedSalt: salt,
      isDissolving: true,
      showPHMeter: false,
      aiExplanation: '',
      showMolecularView: false
    }));

    // Simulate dissolving process
    setTimeout(() => {
      setState(prev => ({ ...prev, isDissolving: false }));
    }, 1500);
  };

  const togglePHMeter = () => {
    setState(prev => ({ ...prev, showPHMeter: !prev.showPHMeter }));
  };

  const toggleMolecularView = () => {
    setState(prev => ({ ...prev, showMolecularView: !prev.showMolecularView }));
  };

  const handleReset = () => {
    setState({
      selectedSalt: null,
      isDissolving: false,
      showPHMeter: false,
      showMolecularView: false,
      aiExplanation: '',
      isLoadingAI: false,
    });
  };

  const askAI = async () => {
    if (!state.selectedSalt) return;
    setState(prev => ({ ...prev, isLoadingAI: true }));
    const explanation = await getSaltExplanation(state.selectedSalt);
    setState(prev => ({ ...prev, aiExplanation: explanation, isLoadingAI: false }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FlaskConical className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-800 leading-none">Lab Virtual Kimia</h1>
              <p className="text-xs text-slate-500 font-medium">Topik: Hidrolisis Garam</p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Reset Lab
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Control Panel */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Pilih Sampel Garam
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {SALTS.map((salt) => (
                <button
                  key={salt.id}
                  onClick={() => handleSaltSelect(salt)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    state.selectedSalt?.id === salt.id 
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="font-bold text-slate-800">{salt.name}</div>
                  <div className="text-xs font-mono text-slate-500">{salt.chemicalFormula}</div>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Info className="w-4 h-4" /> Peralatan Lab
            </h2>
            <div className="space-y-3">
              <button
                disabled={!state.selectedSalt}
                onClick={togglePHMeter}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  !state.selectedSalt ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'
                } ${state.showPHMeter ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5" />
                  <span className="text-sm font-semibold">pH Meter Digital</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${state.showPHMeter ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                   <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${state.showPHMeter ? 'left-6' : 'left-1'}`} />
                </div>
              </button>

              <button
                disabled={!state.selectedSalt}
                onClick={toggleMolecularView}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  !state.selectedSalt ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'
                } ${state.showMolecularView ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                <div className="flex items-center gap-2">
                  <Microscope className="w-5 h-5" />
                  <span className="text-sm font-semibold">Tampilan Molekuler</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${state.showMolecularView ? 'bg-amber-500' : 'bg-slate-300'}`}>
                   <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${state.showMolecularView ? 'left-6' : 'left-1'}`} />
                </div>
              </button>
            </div>
          </section>
        </div>

        {/* Center: Main Simulation Area */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden min-h-[500px] flex flex-col p-8 relative">
            
            {/* Environment UI */}
            <div className="flex justify-between items-start mb-8">
               <div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    Status: {state.isDissolving ? 'Melarutkan...' : state.selectedSalt ? 'Siap Uji' : 'Menunggu Sampel'}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    {state.selectedSalt ? state.selectedSalt.name : 'Pilih Garam'}
                  </h2>
               </div>
               {state.selectedSalt && (
                 <div className="text-right">
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Komponen Asal</p>
                   <p className="text-sm font-medium text-slate-600">
                     {state.selectedSalt.source.acid} ({state.selectedSalt.source.acidType}) + {state.selectedSalt.source.base} ({state.selectedSalt.source.baseType})
                   </p>
                 </div>
               )}
            </div>

            {/* Simulation Canvas */}
            <Beaker 
              salt={state.selectedSalt} 
              isDissolving={state.isDissolving} 
              showPHMeter={state.showPHMeter} 
            />

            {/* Contextual Molecular View Overlay */}
            {state.showMolecularView && state.selectedSalt && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-8 z-20">
                <div className="w-full max-w-md relative">
                  <button 
                    onClick={() => setState(s => ({ ...s, showMolecularView: false }))}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100"
                  >
                    ×
                  </button>
                  <MolecularView salt={state.selectedSalt} />
                </div>
              </div>
            )}

            {/* Instruction if empty */}
            {!state.selectedSalt && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 space-y-4">
                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
                    <FlaskConical className="w-8 h-8 opacity-20" />
                 </div>
                 <p className="text-sm">Silakan pilih salah satu garam di sebelah kiri untuk memulai</p>
              </div>
            )}
          </div>
          
          {/* Reaction Info Card */}
          {state.selectedSalt && (
            <div className="mt-6 w-full glass-panel p-6 rounded-2xl border border-slate-200 shadow-sm">
               <h3 className="text-sm font-bold text-slate-400 mb-3 uppercase flex items-center gap-2">
                 <Info className="w-4 h-4" /> Informasi Reaksi
               </h3>
               <p className="text-slate-700 text-sm leading-relaxed">
                 {state.selectedSalt.description}
               </p>
            </div>
          )}
        </div>

        {/* Right Sidebar: AI Assistant & Analysis */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-indigo-600 p-5 rounded-2xl shadow-lg text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <h2 className="font-bold text-sm uppercase tracking-wider">Asisten Lab AI</h2>
            </div>
            <p className="text-xs text-indigo-100 mb-6 leading-relaxed">
              Punya pertanyaan kenapa garam ini bersifat {state.selectedSalt?.ph && state.selectedSalt.ph > 7.1 ? 'Basa' : state.selectedSalt?.ph && state.selectedSalt.ph < 6.9 ? 'Asam' : 'Netral'}? Tanyakan pada AI!
            </p>
            <button
              onClick={askAI}
              disabled={!state.selectedSalt || state.isLoadingAI}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-inner ${
                !state.selectedSalt || state.isLoadingAI 
                  ? 'bg-indigo-500/50 cursor-not-allowed' 
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {state.isLoadingAI ? (
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Minta Penjelasan AI
                </>
              )}
            </button>
          </section>

          {/* AI Output Panel */}
          {state.aiExplanation && (
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-h-[500px] overflow-y-auto custom-scrollbar">
              <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase">Analisis AI</h3>
              <div className="prose prose-sm prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 text-sm leading-relaxed space-y-4">
                   {state.aiExplanation.split('\n').map((line, i) => {
                     if (line.startsWith('#')) return <h4 key={i} className="font-bold text-slate-900 mt-4">{line.replace(/#/g, '')}</h4>;
                     if (line.startsWith('*')) return <li key={i} className="ml-4 list-disc">{line.replace(/\*/g, '').trim()}</li>;
                     return <p key={i}>{line}</p>;
                   })}
                </div>
              </div>
            </section>
          )}

          {/* Table of Results (History) */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
             <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase">Data Pengamatan</h2>
             <div className="text-center py-8">
               <p className="text-xs text-slate-400">Tabel data pengamatan otomatis tercatat di sini saat Anda melakukan pengujian.</p>
             </div>
          </section>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-100 py-4 px-6 border-t border-slate-200 text-center text-slate-500 text-xs">
        <p>&copy; 2024 Lab Virtual Kimia Edukatif - Dibuat untuk Pembelajaran Kimia SMA</p>
      </footer>
    </div>
  );
};

export default App;
