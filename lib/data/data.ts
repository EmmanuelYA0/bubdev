import { Champagne } from "@/lib/constants";

export async function fetchChampagnes(): Promise<{ champagnes: Champagne[] }> {
  try {
    const response = await fetch("/api/champagnes", {
      method: "GET",
      next: { revalidate: 1800 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching champagnes:", error);
    return { champagnes: [] }; 
  }
}

// Vous pouvez ajouter d'autres fonctions de fetch ici
// export async function fetchWines() { /* ... */ }
// export async function fetchSpirits() { /* ... */ }