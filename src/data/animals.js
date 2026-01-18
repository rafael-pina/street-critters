// Rarity levels and their properties
export const RARITIES = {
  common: {
    name: "Common",
    color: "#8b9a8b",
    bgColor: "#e8efe8",
    points: 10,
    chance: 0.45,
  },
  uncommon: {
    name: "Uncommon",
    color: "#4a9c5d",
    bgColor: "#dff5e3",
    points: 25,
    chance: 0.30,
  },
  rare: {
    name: "Rare",
    color: "#3b82f6",
    bgColor: "#dbeafe",
    points: 50,
    chance: 0.15,
  },
  epic: {
    name: "Epic",
    color: "#8b5cf6",
    bgColor: "#ede9fe",
    points: 100,
    chance: 0.08,
  },
  legendary: {
    name: "Legendary",
    color: "#f59e0b",
    bgColor: "#fef3c7",
    points: 250,
    chance: 0.02,
  },
};

// All possible animals
export const ANIMALS = [
  // Common (45%)
  { id: "pigeon", name: "Pigeon", emoji: "🐦", rarity: "common", habitat: "Urban" },
  { id: "sparrow", name: "Sparrow", emoji: "🐦‍⬛", rarity: "common", habitat: "Urban" },
  { id: "squirrel", name: "Squirrel", emoji: "🐿️", rarity: "common", habitat: "Parks" },
  { id: "ant", name: "Ant", emoji: "🐜", rarity: "common", habitat: "Everywhere" },
  { id: "fly", name: "House Fly", emoji: "🪰", rarity: "common", habitat: "Urban" },
  { id: "spider", name: "Spider", emoji: "🕷️", rarity: "common", habitat: "Buildings" },
  { id: "snail", name: "Snail", emoji: "🐌", rarity: "common", habitat: "Gardens" },
  { id: "worm", name: "Earthworm", emoji: "🪱", rarity: "common", habitat: "Soil" },
  { id: "mouse", name: "Mouse", emoji: "🐁", rarity: "common", habitat: "Urban" },
  
  // Uncommon (30%)
  { id: "cat", name: "Street Cat", emoji: "🐈", rarity: "uncommon", habitat: "Urban" },
  { id: "dog", name: "Stray Dog", emoji: "🐕", rarity: "uncommon", habitat: "Urban" },
  { id: "crow", name: "Crow", emoji: "🐦‍⬛", rarity: "uncommon", habitat: "Urban" },
  { id: "rat", name: "Rat", emoji: "🐀", rarity: "uncommon", habitat: "Urban" },
  { id: "butterfly", name: "Butterfly", emoji: "🦋", rarity: "uncommon", habitat: "Gardens" },
  { id: "bee", name: "Bee", emoji: "🐝", rarity: "uncommon", habitat: "Gardens" },
  { id: "ladybug", name: "Ladybug", emoji: "🐞", rarity: "uncommon", habitat: "Gardens" },
  { id: "frog", name: "Frog", emoji: "🐸", rarity: "uncommon", habitat: "Ponds" },
  
  // Rare (15%)
  { id: "duck", name: "Duck", emoji: "🦆", rarity: "rare", habitat: "Ponds" },
  { id: "swan", name: "Swan", emoji: "🦢", rarity: "rare", habitat: "Lakes" },
  { id: "rabbit", name: "Wild Rabbit", emoji: "🐇", rarity: "rare", habitat: "Parks" },
  { id: "hedgehog", name: "Hedgehog", emoji: "🦔", rarity: "rare", habitat: "Gardens" },
  { id: "seagull", name: "Seagull", emoji: "🕊️", rarity: "rare", habitat: "Coastal" },
  { id: "turtle", name: "Turtle", emoji: "🐢", rarity: "rare", habitat: "Ponds" },
  
  // Epic (8%)
  { id: "fox", name: "Urban Fox", emoji: "🦊", rarity: "epic", habitat: "Urban" },
  { id: "owl", name: "Owl", emoji: "🦉", rarity: "epic", habitat: "Parks" },
  { id: "raccoon", name: "Raccoon", emoji: "🦝", rarity: "epic", habitat: "Urban" },
  { id: "deer", name: "Deer", emoji: "🦌", rarity: "epic", habitat: "Forests" },
  { id: "heron", name: "Heron", emoji: "🦩", rarity: "epic", habitat: "Lakes" },
  
  // Legendary (2%)
  { id: "peacock", name: "Peacock", emoji: "🦚", rarity: "legendary", habitat: "Parks" },
  { id: "eagle", name: "Eagle", emoji: "🦅", rarity: "legendary", habitat: "Mountains" },
  { id: "flamingo", name: "Flamingo", emoji: "🦩", rarity: "legendary", habitat: "Wetlands" },
  { id: "wolf", name: "Wolf", emoji: "🐺", rarity: "legendary", habitat: "Wilderness" },
];

// Get a random animal based on rarity weights
export function identifyAnimal() {
  const roll = Math.random();
  let cumulative = 0;
  let selectedRarity = "common";

  for (const [rarity, data] of Object.entries(RARITIES)) {
    cumulative += data.chance;
    if (roll <= cumulative) {
      selectedRarity = rarity;
      break;
    }
  }

  const animalsOfRarity = ANIMALS.filter((a) => a.rarity === selectedRarity);
  const randomAnimal = animalsOfRarity[Math.floor(Math.random() * animalsOfRarity.length)];
  
  return {
    ...randomAnimal,
    capturedAt: new Date().toISOString(),
    uid: `${randomAnimal.id}-${Date.now()}`,
  };
}

// Generate avatar style based on animal
export function generateAvatarStyle(animal) {
  const rarity = RARITIES[animal.rarity];
  const hue = Math.floor(Math.random() * 360);
  
  return {
    background: `linear-gradient(135deg, ${rarity.bgColor} 0%, hsl(${hue}, 60%, 90%) 100%)`,
    borderColor: rarity.color,
    glowColor: `${rarity.color}40`,
  };
}
