export const GENERATION_LEGEND = [
  { label: "1세대 (시조)", color: "#1e6091" },
  { label: "2세대", color: "#2a7f62" },
  { label: "3세대", color: "#b5476b" },
  { label: "4세대", color: "#4a4a8a" },
];

// Lighter tones than the generation colors so the stripe is never mistaken for one.
export const GENDER_COLORS = { male: "#60a5fa", female: "#f472b6" } as const;

export const generationColor = (gen: number) => GENERATION_LEGEND[gen - 1]?.color ?? "#64748b";
