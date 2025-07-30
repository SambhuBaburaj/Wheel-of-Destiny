// Mock saved characters for opponent selection
export const mockCharacters = [
  {
    id: 'char_001',
    name: 'Arjun the Destroyer',
    race: {
      main: 'Dragon',
      subRace: 'Fire Dragon',
      baseStats: { strength: 90, intelligence: 70, speed: 60, magic: 95 },
      subRaceBonus: { strength: 15, magic: 10 }
    },
    powers: {
      raceSpecific: { name: 'Inferno Storm', statBonus: { strength: 25, magic: 25 } },
      general: { name: 'Super Strength', statBonus: { strength: 30 } },
      memePower: { name: 'Pulimurugan Tiger Strength', movie: 'Pulimurugan', statBonus: { strength: 35, speed: 15 } }
    },
    weapon: { name: 'Dragon Blade', statBonus: { strength: 25, magic: 15 } },
    statBoosts: {
      strength: [15, 25],
      intelligence: [10, 15],
      speed: [5, 10],
      magic: [25, 50]
    },
    totalPower: 542,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'char_002', 
    name: 'Meera the Mystic',
    race: {
      main: 'Elf',
      subRace: 'Ancient Elf',
      baseStats: { strength: 40, intelligence: 70, speed: 60, magic: 80 },
      subRaceBonus: { intelligence: 25, magic: 20 }
    },
    powers: {
      raceSpecific: { name: 'Timeless One', statBonus: { intelligence: 50, magic: 50, speed: 30 } },
      general: { name: 'Reality Warping', statBonus: { strength: 20, intelligence: 30, magic: 40 } },
      memePower: { name: 'Premam Malare Magic', movie: 'Premam', statBonus: { intelligence: 35, magic: 25 } }
    },
    weapon: { name: 'Staff of Infinity', statBonus: { magic: 40, intelligence: 20 } },
    statBoosts: {
      strength: [5, 10],
      intelligence: [25, 50],
      speed: [15, 25],
      magic: [15, 25, 50]
    },
    totalPower: 748,
    createdAt: '2024-01-14T15:45:00Z'
  },
  {
    id: 'char_003',
    name: 'Gopal the Giant',
    race: {
      main: 'Dwarf',
      subRace: 'King Dwarf',
      baseStats: { strength: 80, intelligence: 60, speed: 30, magic: 40 },
      subRaceBonus: { strength: 25, intelligence: 20 }
    },
    powers: {
      raceSpecific: { name: 'Eternal King', statBonus: { strength: 50, intelligence: 50, magic: 40 } },
      general: { name: 'Immortality', statBonus: { strength: 25, intelligence: 25, magic: 30 } },
      memePower: { name: 'Spadikam Aadu Thoma Rage', movie: 'Spadikam', statBonus: { strength: 30, speed: 10 } }
    },
    weapon: { name: 'Excalibur', statBonus: { strength: 30, magic: 20, intelligence: 10 } },
    statBoosts: {
      strength: [25, 50],
      intelligence: [15, 25],
      speed: [5, 15],
      magic: [10, 25]
    },
    totalPower: 675,
    createdAt: '2024-01-13T09:20:00Z'
  },
  {
    id: 'char_004',
    name: 'Priya the Phoenix',
    race: {
      main: 'Phoenix',
      subRace: 'Celestial Phoenix',
      baseStats: { strength: 70, intelligence: 85, speed: 95, magic: 100 },
      subRaceBonus: { intelligence: 25, magic: 25 }
    },
    powers: {
      raceSpecific: { name: 'Seraph Phoenix', statBonus: { intelligence: 55, magic: 60, speed: 40 } },
      general: { name: 'Time Control', statBonus: { intelligence: 25, magic: 35, speed: 20 } },
      memePower: { name: 'Lucifer Mass Entry', movie: 'Lucifer', statBonus: { intelligence: 25, magic: 20 } }
    },
    weapon: { name: 'No Weapon', statBonus: { strength: 40, speed: 30 } },
    statBoosts: {
      strength: [15, 25],
      intelligence: [25, 50],
      speed: [15, 25, 50],
      magic: [10, 25]
    },
    totalPower: 925,
    createdAt: '2024-01-12T14:10:00Z'
  },
  {
    id: 'char_005',
    name: 'Ravi the Rogue',
    race: {
      main: 'Human',
      subRace: 'Assassin',
      baseStats: { strength: 50, intelligence: 50, speed: 50, magic: 30 },
      subRaceBonus: { speed: 12, intelligence: 8 }
    },
    powers: {
      raceSpecific: { name: "Death's Touch", statBonus: { speed: 25, intelligence: 15, magic: 10 } },
      general: { name: 'Lightning Speed', statBonus: { speed: 35 } },
      memePower: { name: 'Kilukkam Comedy Chaos', movie: 'Kilukkam', statBonus: { intelligence: 20, speed: 25 } }
    },
    weapon: { name: 'Bow of Precision', statBonus: { speed: 15, intelligence: 5 } },
    statBoosts: {
      strength: [10, 15],
      intelligence: [15, 25],
      speed: [25, 50],
      magic: [5, 10]
    },
    totalPower: 428,
    createdAt: '2024-01-11T11:30:00Z'
  },
  {
    id: 'char_006',
    name: 'Lakshmi the Lightning',
    race: {
      main: 'Dragon',
      subRace: 'Lightning Dragon',
      baseStats: { strength: 90, intelligence: 70, speed: 60, magic: 95 },
      subRaceBonus: { speed: 20, magic: 10 }
    },
    powers: {
      raceSpecific: { name: 'Storm Lord', statBonus: { speed: 50, magic: 40, intelligence: 30 } },
      general: { name: 'Energy Absorption', statBonus: { strength: 20, magic: 25 } },
      memePower: { name: 'Narasimham Lion Roar', movie: 'Narasimham', statBonus: { strength: 25, magic: 15 } }
    },
    weapon: { name: 'Magic Staff', statBonus: { magic: 20, intelligence: 10 } },
    statBoosts: {
      strength: [5, 15],
      intelligence: [10, 25],
      speed: [25, 50],
      magic: [15, 25]
    },
    totalPower: 692,
    createdAt: '2024-01-10T16:45:00Z'
  }
];

// Local storage functions for managing saved characters
export const saveCharacterToFile = (character) => {
  try {
    const savedChars = getSavedCharacters();
    const newCharacter = {
      ...character,
      id: `char_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    const updatedChars = [...savedChars, newCharacter];
    localStorage.setItem('wheelOfDestinyCharacters', JSON.stringify(updatedChars));
    
    return newCharacter;
  } catch (error) {
    console.error('Error saving character:', error);
    return null;
  }
};

export const getSavedCharacters = () => {
  try {
    const saved = localStorage.getItem('wheelOfDestinyCharacters');
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Initialize with mock characters if no saved data exists
    localStorage.setItem('wheelOfDestinyCharacters', JSON.stringify(mockCharacters));
    return mockCharacters;
  } catch (error) {
    console.error('Error loading characters:', error);
    return mockCharacters;
  }
};

export const deleteCharacter = (characterId) => {
  try {
    const savedChars = getSavedCharacters();
    const updatedChars = savedChars.filter(char => char.id !== characterId);
    localStorage.setItem('wheelOfDestinyCharacters', JSON.stringify(updatedChars));
    return updatedChars;
  } catch (error) {
    console.error('Error deleting character:', error);
    return getSavedCharacters();
  }
};

export const generateCharacterName = (character) => {
  const raceNames = {
    'Human': ['Alex', 'Maya', 'Raj', 'Priya', 'John', 'Sarah'],
    'Elf': ['Legolas', 'Arwen', 'Elrond', 'Galadriel', 'Thranduil', 'Tauriel'],
    'Dwarf': ['Gimli', 'Thorin', 'Balin', 'Dwalin', 'Ori', 'Nori'],
    'Dragon': ['Smaug', 'Alduin', 'Bahamut', 'Tiamat', 'Fafnir', 'Ryuu'],
    'Phoenix': ['Fawkes', 'Bennu', 'Feng', 'Simurgh', 'Homa', 'Ziz']
  };
  
  const titles = {
    high: ['the Legendary', 'the Almighty', 'the Supreme', 'the Divine', 'the Eternal'],
    medium: ['the Brave', 'the Wise', 'the Swift', 'the Mighty', 'the Clever'],
    low: ['the Bold', 'the Quick', 'the Strong', 'the Smart', 'the Fierce']
  };
  
  const racePool = raceNames[character.race?.main] || raceNames['Human'];
  const name = racePool[Math.floor(Math.random() * racePool.length)];
  
  let titlePool;
  if (character.totalPower > 700) titlePool = titles.high;
  else if (character.totalPower > 500) titlePool = titles.medium;
  else titlePool = titles.low;
  
  const title = titlePool[Math.floor(Math.random() * titlePool.length)];
  
  return `${name} ${title}`;
};