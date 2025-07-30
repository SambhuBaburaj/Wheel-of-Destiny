export const calculateTotalPower = (character) => {
  const { race, powers, weapon, statBoosts } = character;
  
  // Start with base racial stats
  let totalStats = { ...race.baseStats };
  
  // Add sub-race bonuses
  if (race.subRaceBonus) {
    Object.keys(race.subRaceBonus).forEach(stat => {
      totalStats[stat] = (totalStats[stat] || 0) + race.subRaceBonus[stat];
    });
  }
  
  // Add power bonuses (race-specific, general, meme)
  [powers.raceSpecific, powers.general, powers.memePower].forEach(power => {
    if (power?.statBonus) {
      Object.keys(power.statBonus).forEach(stat => {
        totalStats[stat] = (totalStats[stat] || 0) + power.statBonus[stat];
      });
    }
  });
  
  // Add weapon bonuses
  if (weapon?.statBonus) {
    Object.keys(weapon.statBonus).forEach(stat => {
      totalStats[stat] = (totalStats[stat] || 0) + weapon.statBonus[stat];
    });
  }
  
  // Add stat boost bonuses
  if (statBoosts) {
    Object.keys(statBoosts).forEach(stat => {
      const statTotal = statBoosts[stat].reduce((sum, boost) => sum + boost, 0);
      totalStats[stat] = (totalStats[stat] || 0) + statTotal;
    });
  }
  
  // Ensure no negative stats
  Object.keys(totalStats).forEach(stat => {
    totalStats[stat] = Math.max(0, totalStats[stat]);
  });
  
  // Calculate final power (all stats combined)
  const totalPower = Object.values(totalStats).reduce((sum, stat) => sum + stat, 0);
  
  return {
    finalStats: totalStats,
    totalPower: totalPower + calculateSynergy(character)
  };
};

export const calculateSynergy = (character) => {
  let synergy = 0;
  
  // Race + General Power synergy
  if (character.race.main === "Elf" && character.powers.general?.name.toLowerCase().includes("magic")) {
    synergy += 25; // Elves get magic bonus
  }
  
  if (character.race.main === "Dragon" && character.powers.general?.name.toLowerCase().includes("fire")) {
    synergy += 30; // Dragons get fire bonus
  }
  
  // Power + Weapon synergy  
  if (character.powers.general?.name.toLowerCase().includes("fire") && 
      character.weapon?.name.toLowerCase().includes("dragon")) {
    synergy += 30; // Fire powers + dragon weapons
  }
  
  if (character.powers.general?.name.toLowerCase().includes("magic") && 
      character.weapon?.name.toLowerCase().includes("staff")) {
    synergy += 25; // Magic powers + magic staff
  }
  
  // Meme power + race synergy
  if (character.race.main === "Human" && character.powers.memePower?.movie) {
    synergy += 20; // Humans excel at movie powers
  }
  
  // Sub-race specific synergies
  if (character.race.subRace === "Fire Dragon" && 
      character.powers.raceSpecific?.name.toLowerCase().includes("fire")) {
    synergy += 15;
  }
  
  if (character.race.subRace === "Archmage" && 
      character.powers.general?.name.toLowerCase().includes("magic")) {
    synergy += 20;
  }
  
  return synergy;
};

export const compareCharacters = (char1, char2) => {
  const char1Power = calculateTotalPower(char1);
  const char2Power = calculateTotalPower(char2);
  
  const powerDifference = Math.abs(char1Power.totalPower - char2Power.totalPower);
  const totalPower = char1Power.totalPower + char2Power.totalPower;
  
  // Calculate win probability based on power difference
  let char1WinProbability;
  if (powerDifference === 0) {
    char1WinProbability = 50;
  } else {
    const stronger = char1Power.totalPower > char2Power.totalPower ? 1 : 2;
    const winnerAdvantage = Math.min(85, 50 + (powerDifference / totalPower) * 100);
    char1WinProbability = stronger === 1 ? winnerAdvantage : 100 - winnerAdvantage;
  }
  
  return {
    char1Power: char1Power.totalPower,
    char2Power: char2Power.totalPower,
    char1Stats: char1Power.finalStats,
    char2Stats: char2Power.finalStats,
    char1WinProbability: Math.round(char1WinProbability),
    char2WinProbability: Math.round(100 - char1WinProbability),
    powerDifference,
    winner: null // Will be determined by final battle wheel
  };
};