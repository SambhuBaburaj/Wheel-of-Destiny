import { GAME_PHASES } from '../data/gameConstants';
import { races } from '../data/races';
import { subRaces } from '../data/subRaces';
import { raceSpecificPowers } from '../data/raceSpecificPowers';
import { generalPowers } from '../data/generalPowers';
import { malayalamMemePowers } from '../data/malayalamMemePowers';
import { weapons } from '../data/weapons';
import { statEnhancements } from '../data/statEnhancements';

export const getWheelDataForPhase = (phase, characterData) => {
  switch (phase) {
    case 'race-selection':
      return races;
      
    case 'sub-race':
      return subRaces[characterData.race?.main] || [];
      
    case 'race-power':
      const mainRace = characterData.race?.main;
      const subRace = characterData.race?.subRace;
      return (mainRace && subRace) ? raceSpecificPowers[mainRace]?.[subRace] || [] : [];
      
    case 'general-power':
      return generalPowers;
      
    case 'meme-power':
      return malayalamMemePowers;
      
    case 'weapon':
      return weapons;
      
    case 'stat-boost-strength':
      return statEnhancements.strength;
      
    case 'stat-boost-intelligence':
      return statEnhancements.intelligence;
      
    case 'stat-boost-speed':
      return statEnhancements.speed;
      
    case 'stat-boost-magic':
      return statEnhancements.magic;
      
    default:
      return [];
  }
};

export const getNextPhase = (currentPhase) => {
  const currentIndex = GAME_PHASES.indexOf(currentPhase);
  if (currentIndex >= 0 && currentIndex < GAME_PHASES.length - 1) {
    return GAME_PHASES[currentIndex + 1];
  }
  return null; // End of phases
};

export const updateCharacterWithSelection = (character, phase, selectedItem) => {
  const updatedCharacter = { ...character };
  
  switch (phase) {
    case 'race-selection':
      updatedCharacter.race = {
        main: selectedItem.name,
        baseStats: { ...selectedItem.baseStats },
        description: selectedItem.description
      };
      break;
      
    case 'sub-race':
      updatedCharacter.race = {
        ...updatedCharacter.race,
        subRace: selectedItem.name,
        subRaceBonus: { ...selectedItem.bonusStats },
        subRaceDescription: selectedItem.description
      };
      break;
      
    case 'race-power':
      updatedCharacter.powers = {
        ...updatedCharacter.powers,
        raceSpecific: selectedItem
      };
      break;
      
    case 'general-power':
      updatedCharacter.powers = {
        ...updatedCharacter.powers,
        general: selectedItem
      };
      break;
      
    case 'meme-power':
      updatedCharacter.powers = {
        ...updatedCharacter.powers,
        memePower: selectedItem
      };
      break;
      
    case 'weapon':
      updatedCharacter.weapon = selectedItem;
      break;
      
    case 'stat-boost-strength':
      updatedCharacter.statBoosts = {
        ...updatedCharacter.statBoosts,
        strength: [...(updatedCharacter.statBoosts?.strength || []), selectedItem.boost]
      };
      break;
      
    case 'stat-boost-intelligence':
      updatedCharacter.statBoosts = {
        ...updatedCharacter.statBoosts,
        intelligence: [...(updatedCharacter.statBoosts?.intelligence || []), selectedItem.boost]
      };
      break;
      
    case 'stat-boost-speed':
      updatedCharacter.statBoosts = {
        ...updatedCharacter.statBoosts,
        speed: [...(updatedCharacter.statBoosts?.speed || []), selectedItem.boost]
      };
      break;
      
    case 'stat-boost-magic':
      updatedCharacter.statBoosts = {
        ...updatedCharacter.statBoosts,
        magic: [...(updatedCharacter.statBoosts?.magic || []), selectedItem.boost]
      };
      break;
      
    default:
      break;
  }
  
  return updatedCharacter;
};

export const createEmptyCharacter = () => ({
  race: {
    main: null,
    subRace: null,
    baseStats: {},
    subRaceBonus: {},
    description: '',
    subRaceDescription: ''
  },
  powers: {
    raceSpecific: null,
    general: null,
    memePower: null
  },
  weapon: null,
  statBoosts: {
    strength: [],
    intelligence: [],
    speed: [],
    magic: []
  },
  finalStats: { strength: 0, intelligence: 0, speed: 0, magic: 0 },
  totalPower: 0
});

export const isCharacterComplete = (character) => {
  return (
    character.race?.main &&
    character.race?.subRace &&
    character.powers?.raceSpecific &&
    character.powers?.general &&
    character.powers?.memePower &&
    character.weapon &&
    character.statBoosts?.strength?.length > 0 &&
    character.statBoosts?.intelligence?.length > 0 &&
    character.statBoosts?.speed?.length > 0 &&
    character.statBoosts?.magic?.length > 0
  );
};