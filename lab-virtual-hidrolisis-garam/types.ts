
export type SaltType = 'NaCl' | 'CH3COONa' | 'NH4Cl' | 'CH3COONH4' | 'Na2CO3' | 'AlCl3';

export interface SaltInfo {
  id: SaltType;
  name: string;
  chemicalFormula: string;
  source: {
    acid: string;
    base: string;
    acidType: 'Strong' | 'Weak';
    baseType: 'Strong' | 'Weak';
  };
  ph: number;
  description: string;
  reaction: string;
  color: string;
}

export interface SimulationState {
  selectedSalt: SaltInfo | null;
  isDissolving: boolean;
  showPHMeter: boolean;
  showMolecularView: boolean;
  aiExplanation: string;
  isLoadingAI: boolean;
}
