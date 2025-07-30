export const GAME_PHASES = [
  'race-selection',
  'sub-race',
  'race-power', 
  'general-power',
  'meme-power',
  'weapon',
  'stat-boost-strength',
  'stat-boost-intelligence', 
  'stat-boost-speed',
  'stat-boost-magic'
];

export const PHASE_NAMES = {
  'race-selection': 'Choose Your Race',
  'sub-race': 'Choose Sub-Race',
  'race-power': 'Race-Specific Power',
  'general-power': 'General Power',
  'meme-power': 'Malayalam Meme Power',
  'weapon': 'Choose Weapon',
  'stat-boost-strength': 'Strength Boost',
  'stat-boost-intelligence': 'Intelligence Boost',
  'stat-boost-speed': 'Speed Boost',
  'stat-boost-magic': 'Magic Boost'
};

export const STAT_NAMES = {
  strength: 'Strength',
  intelligence: 'Intelligence', 
  speed: 'Speed',
  magic: 'Magic'
};

export const STAT_COLORS = {
  strength: '#8B0000',
  intelligence: '#4169E1',
  speed: '#32CD32',
  magic: '#9370DB'
};

export const WHEEL_CONFIG = {
  animationDuration: 3000,
  minSpins: 3,
  maxSpins: 8
};