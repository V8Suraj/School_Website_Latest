// Free MyMemory translation API — no key needed, 5000 chars/day
// https://mymemory.translated.net/doc/spec.php

export async function translateText(text, langpair) {
  if (!text.trim()) return "";
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (!translated || translated === text) throw new Error("No translation");
    return translated;
  } catch {
    return text;
  }
}

export async function translateToHindi(text) {
  return translateText(text, "en|hi");
}

export async function translateToEnglish(text) {
  return translateText(text, "hi|en");
}

// Translate multiple fields at once in parallel
export async function translateFields(fields, langpair = "en|hi") {
  const entries = Object.entries(fields);
  const translated = await Promise.all(
    entries.map(async ([key, val]) => [key, val ? await translateText(val, langpair) : val])
  );
  return Object.fromEntries(translated);
}