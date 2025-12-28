
import { GoogleGenAI } from "@google/genai";
import { SaltInfo } from "../types";

export const getSaltExplanation = async (salt: SaltInfo): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Jelaskan konsep hidrolisis garam untuk senyawa berikut dalam konteks pendidikan kimia SMA:
    Nama: ${salt.name}
    Rumus: ${salt.chemicalFormula}
    Asal Asam: ${salt.source.acid} (${salt.source.acidType})
    Asal Basa: ${salt.source.base} (${salt.source.baseType})
    pH terukur: ${salt.ph}

    Berikan penjelasan langkah demi langkah:
    1. Mengapa garam ini bersifat asam/basa/netral?
    2. Tunjukkan persamaan reaksi hidrolisisnya.
    3. Apa yang terjadi pada tingkat molekuler (interaksi dengan air)?
    4. Kesimpulan sifat garamnya.
    
    Gunakan bahasa Indonesia yang edukatif, santai, dan mudah dimengerti siswa. Gunakan format Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Maaf, penjelasan tidak tersedia saat ini.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten AI.";
  }
};
