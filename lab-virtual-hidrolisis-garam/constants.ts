
import { SaltInfo } from './types';

export const SALTS: SaltInfo[] = [
  {
    id: 'NaCl',
    name: 'Natrium Klorida',
    chemicalFormula: 'NaCl',
    source: { acid: 'HCl', base: 'NaOH', acidType: 'Strong', baseType: 'Strong' },
    ph: 7.0,
    description: 'Garam dari asam kuat dan basa kuat. Tidak mengalami hidrolisis.',
    reaction: 'NaCl (aq) → Na⁺ (aq) + Cl⁻ (aq)',
    color: 'bg-blue-100'
  },
  {
    id: 'CH3COONa',
    name: 'Natrium Asetat',
    chemicalFormula: 'CH3COONa',
    source: { acid: 'CH3COOH', base: 'NaOH', acidType: 'Weak', baseType: 'Strong' },
    ph: 8.9,
    description: 'Garam dari asam lemah dan basa kuat. Mengalami hidrolisis sebagian (anion).',
    reaction: 'CH3COO⁻ (aq) + H2O (l) ⇌ CH3COOH (aq) + OH⁻ (aq)',
    color: 'bg-green-100'
  },
  {
    id: 'NH4Cl',
    name: 'Amonium Klorida',
    chemicalFormula: 'NH4Cl',
    source: { acid: 'HCl', base: 'NH3', acidType: 'Strong', baseType: 'Weak' },
    ph: 5.1,
    description: 'Garam dari asam kuat dan basa lemah. Mengalami hidrolisis sebagian (kation).',
    reaction: 'NH4⁺ (aq) + H2O (l) ⇌ NH3 (aq) + H3O⁺ (aq)',
    color: 'bg-red-100'
  },
  {
    id: 'Na2CO3',
    name: 'Natrium Karbonat',
    chemicalFormula: 'Na2CO3',
    source: { acid: 'H2CO3', base: 'NaOH', acidType: 'Weak', baseType: 'Strong' },
    ph: 11.5,
    description: 'Garam basa kuat yang menghasilkan larutan sangat alkalin.',
    reaction: 'CO3²⁻ (aq) + H2O (l) ⇌ HCO3⁻ (aq) + OH⁻ (aq)',
    color: 'bg-emerald-100'
  },
  {
    id: 'AlCl3',
    name: 'Aluminium Klorida',
    chemicalFormula: 'AlCl3',
    source: { acid: 'HCl', base: 'Al(OH)3', acidType: 'Strong', baseType: 'Weak' },
    ph: 3.5,
    description: 'Garam asam kuat yang menghasilkan larutan sangat asam karena hidrolisis kation logam.',
    reaction: '[Al(H2O)6]³⁺ (aq) + H2O (l) ⇌ [Al(H2O)5(OH)]²⁺ (aq) + H3O⁺ (aq)',
    color: 'bg-orange-100'
  },
  {
    id: 'CH3COONH4',
    name: 'Amonium Asetat',
    chemicalFormula: 'CH3COONH4',
    source: { acid: 'CH3COOH', base: 'NH3', acidType: 'Weak', baseType: 'Weak' },
    ph: 7.0,
    description: 'Garam dari asam lemah dan basa lemah. Hidrolisis total. pH bergantung pada Ka dan Kb.',
    reaction: 'NH4⁺ + CH3COO⁻ + H2O ⇌ NH3 + CH3COOH',
    color: 'bg-purple-100'
  }
];

export const getPHColor = (ph: number) => {
  if (ph < 3) return 'rgb(255, 0, 0)';
  if (ph < 5) return 'rgb(255, 127, 0)';
  if (ph < 7) return 'rgb(255, 255, 0)';
  if (ph === 7) return 'rgb(0, 255, 0)';
  if (ph < 9) return 'rgb(0, 255, 255)';
  if (ph < 11) return 'rgb(0, 0, 255)';
  return 'rgb(139, 0, 255)';
};
