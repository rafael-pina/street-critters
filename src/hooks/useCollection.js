import { useState, useEffect } from "react";
import { RARITIES } from "../data/animals";

const STORAGE_KEY = "street-critters-collection";

export function useCollection() {
  const [collection, setCollection] = useState([]);
  const [stats, setStats] = useState({
    totalPoints: 0,
    totalCatches: 0,
    uniqueSpecies: 0,
    byRarity: {},
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCollection(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load collection:", e);
      }
    }
  }, []);

  // Save to localStorage and update stats when collection changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
    
    // Calculate stats
    const uniqueIds = new Set(collection.map((a) => a.id));
    const byRarity = {};
    let totalPoints = 0;

    for (const animal of collection) {
      const rarityData = RARITIES[animal.rarity];
      totalPoints += rarityData.points;
      byRarity[animal.rarity] = (byRarity[animal.rarity] || 0) + 1;
    }

    setStats({
      totalPoints,
      totalCatches: collection.length,
      uniqueSpecies: uniqueIds.size,
      byRarity,
    });
  }, [collection]);

  const addToCollection = (animal) => {
    setCollection((prev) => [animal, ...prev]);
  };

  const clearCollection = () => {
    if (window.confirm("Are you sure you want to release all your critters?")) {
      setCollection([]);
    }
  };

  return {
    collection,
    stats,
    addToCollection,
    clearCollection,
  };
}
