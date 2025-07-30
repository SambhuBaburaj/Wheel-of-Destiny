export const raceSpecificPowers = {
  Human: {
    Warrior: [
      { name: "Berserker Rage", probability: 25, statBonus: { strength: 20, speed: 10 }, description: "Uncontrollable battle fury", color: "#8B0000" },
      { name: "Shield Master", probability: 30, statBonus: { strength: 15, intelligence: 5 }, description: "Impenetrable defense", color: "#4682B4" },
      { name: "Weapon Mastery", probability: 25, statBonus: { strength: 18, speed: 7 }, description: "Expert with all weapons", color: "#CD853F" },
      { name: "Battle Tactics", probability: 15, statBonus: { intelligence: 15, strength: 10 }, description: "Strategic combat genius", color: "#228B22" },
      { name: "Legendary Warrior", probability: 5, statBonus: { strength: 30, speed: 15, intelligence: 10 }, description: "Once-in-a-generation fighter", color: "#FFD700" }
    ],
    Scholar: [
      { name: "Ancient Knowledge", probability: 30, statBonus: { intelligence: 20, magic: 10 }, description: "Access to forbidden lore", color: "#4169E1" },
      { name: "Speed Reading", probability: 25, statBonus: { intelligence: 15, speed: 10 }, description: "Absorb information instantly", color: "#32CD32" },
      { name: "Alchemy Master", probability: 20, statBonus: { intelligence: 18, magic: 12 }, description: "Transform matter itself", color: "#9370DB" },
      { name: "Mind Palace", probability: 15, statBonus: { intelligence: 25, magic: 5 }, description: "Perfect memory recall", color: "#20B2AA" },
      { name: "Omniscience", probability: 10, statBonus: { intelligence: 35, magic: 20 }, description: "Know all things", color: "#FFD700" }
    ],
    Assassin: [
      { name: "Shadow Step", probability: 30, statBonus: { speed: 20, intelligence: 5 }, description: "Teleport through shadows", color: "#2F2F2F" },
      { name: "Poison Master", probability: 25, statBonus: { intelligence: 15, speed: 10 }, description: "Deadly toxin expert", color: "#8A2BE2" },
      { name: "Silent Death", probability: 20, statBonus: { speed: 18, strength: 7 }, description: "Kill without sound", color: "#696969" },
      { name: "Perfect Aim", probability: 15, statBonus: { intelligence: 20, speed: 10 }, description: "Never miss a target", color: "#DC143C" },
      { name: "Death's Touch", probability: 10, statBonus: { speed: 25, intelligence: 15, magic: 10 }, description: "Kill with a single touch", color: "#000000" }
    ],
    Paladin: [
      { name: "Divine Shield", probability: 30, statBonus: { strength: 15, magic: 15 }, description: "Holy protection", color: "#FFD700" },
      { name: "Healing Light", probability: 25, statBonus: { magic: 20, intelligence: 5 }, description: "Restore life force", color: "#98FB98" },
      { name: "Smite Evil", probability: 20, statBonus: { strength: 18, magic: 12 }, description: "Divine judgment strike", color: "#F0F8FF" },
      { name: "Aura of Courage", probability: 15, statBonus: { strength: 12, magic: 18 }, description: "Inspire allies, terrify enemies", color: "#FFE4E1" },
      { name: "Avatar of Light", probability: 10, statBonus: { strength: 25, magic: 30, intelligence: 15 }, description: "Become divine champion", color: "#FFFAF0" }
    ],
    Archmage: [
      { name: "Elemental Mastery", probability: 25, statBonus: { magic: 25, intelligence: 10 }, description: "Control all elements", color: "#FF69B4" },
      { name: "Spell Weaving", probability: 20, statBonus: { magic: 20, intelligence: 15 }, description: "Combine multiple spells", color: "#9370DB" },
      { name: "Mana Overflow", probability: 20, statBonus: { magic: 30, intelligence: 5 }, description: "Unlimited magical energy", color: "#0000FF" },
      { name: "Reality Revision", probability: 15, statBonus: { magic: 35, intelligence: 20 }, description: "Rewrite the laws of magic", color: "#8A2BE2" },
      { name: "God-Tier Magic", probability: 20, statBonus: { magic: 50, intelligence: 30, strength: 10 }, description: "Transcend mortal magic limits", color: "#FFD700" }
    ]
  },
  Elf: {
    "Wood Elf": [
      { name: "Spirit Bond", probability: 30, statBonus: { intelligence: 15, magic: 10 }, description: "Communicate with forest spirits", color: "#228B22" },
      { name: "Nature's Wrath", probability: 25, statBonus: { magic: 20, strength: 5 }, description: "Command plants and animals", color: "#32CD32" },
      { name: "Tree Walking", probability: 20, statBonus: { speed: 18, intelligence: 7 }, description: "Move through trees like air", color: "#556B2F" },
      { name: "Beast Master", probability: 15, statBonus: { intelligence: 20, magic: 10 }, description: "Command all woodland creatures", color: "#8FBC8F" },
      { name: "Forest Lord", probability: 10, statBonus: { magic: 30, intelligence: 25, speed: 15 }, description: "Ruler of all nature", color: "#006400" }
    ],
    "High Elf": [
      { name: "Arcane Intellect", probability: 30, statBonus: { intelligence: 20, magic: 10 }, description: "Enhanced magical understanding", color: "#4169E1" },
      { name: "Spell Sword", probability: 25, statBonus: { strength: 12, magic: 18 }, description: "Blend magic with swordsmanship", color: "#9370DB" },
      { name: "Mage Sight", probability: 20, statBonus: { intelligence: 18, magic: 12 }, description: "See all magical auras", color: "#00CED1" },
      { name: "Noble Blood", probability: 15, statBonus: { intelligence: 25, magic: 15, strength: 5 }, description: "Ancient elven nobility", color: "#E6E6FA" },
      { name: "Elven Lord", probability: 10, statBonus: { intelligence: 35, magic: 35, speed: 20 }, description: "Supreme elven magic", color: "#FFD700" }
    ],
    "Dark Elf": [
      { name: "Shadow Magic", probability: 30, statBonus: { magic: 20, speed: 10 }, description: "Master of darkness", color: "#2F2F2F" },
      { name: "Fear Aura", probability: 25, statBonus: { magic: 15, intelligence: 10 }, description: "Radiate terror", color: "#8B008B" },
      { name: "Soul Drain", probability: 20, statBonus: { magic: 22, intelligence: 8 }, description: "Steal life force", color: "#4B0082" },
      { name: "Void Walker", probability: 15, statBonus: { magic: 25, speed: 15 }, description: "Step between dimensions", color: "#191970" },
      { name: "Darkness Incarnate", probability: 10, statBonus: { magic: 40, intelligence: 20, speed: 25 }, description: "Become living shadow", color: "#000000" }
    ],
    "Sun Elf": [
      { name: "Sun Striker", probability: 30, statBonus: { magic: 18, strength: 12 }, description: "Solar energy attacks", color: "#FFD700" },
      { name: "Light Healing", probability: 25, statBonus: { magic: 20, intelligence: 5 }, description: "Restore with sunlight", color: "#FFFFE0" },
      { name: "Solar Flare", probability: 20, statBonus: { magic: 25, speed: 5 }, description: "Blinding light explosion", color: "#FFA500" },
      { name: "Day Walker", probability: 15, statBonus: { magic: 22, speed: 18 }, description: "Enhanced in daylight", color: "#F0E68C" },
      { name: "Solar Avatar", probability: 10, statBonus: { magic: 45, strength: 25, intelligence: 20 }, description: "Channel the sun's power", color: "#FF6347" }
    ],
    "Ancient Elf": [
      { name: "Time Wisdom", probability: 25, statBonus: { intelligence: 30, magic: 15 }, description: "Knowledge from all ages", color: "#2E8B57" },
      { name: "Elven Lore", probability: 25, statBonus: { intelligence: 25, magic: 20 }, description: "Access to lost magic", color: "#3CB371" },
      { name: "Immortal Memory", probability: 20, statBonus: { intelligence: 35, magic: 10 }, description: "Remember all of history", color: "#20B2AA" },
      { name: "Ancient Magic", probability: 15, statBonus: { magic: 40, intelligence: 20 }, description: "Pre-creation spells", color: "#4682B4" },
      { name: "Timeless One", probability: 15, statBonus: { intelligence: 50, magic: 50, speed: 30 }, description: "Exist outside time", color: "#FFD700" }
    ]
  },
  Dwarf: {
    "Mountain Dwarf": [
      { name: "Stone Skin", probability: 30, statBonus: { strength: 18, speed: -5 }, description: "Skin hard as rock", color: "#708090" },
      { name: "Mountain's Strength", probability: 25, statBonus: { strength: 22, intelligence: 3 }, description: "Power of the peaks", color: "#696969" },
      { name: "Earth Tremor", probability: 20, statBonus: { strength: 20, magic: 8 }, description: "Shake the ground", color: "#8B4513" },
      { name: "Avalanche Call", probability: 15, statBonus: { strength: 25, magic: 15 }, description: "Summon landslides", color: "#A0522D" },
      { name: "Mountain Lord", probability: 10, statBonus: { strength: 40, magic: 20, intelligence: 15 }, description: "Command all mountains", color: "#2F4F4F" }
    ],
    "Forge Dwarf": [
      { name: "Master Smith", probability: 30, statBonus: { intelligence: 15, strength: 10 }, description: "Craft legendary items", color: "#CD853F" },
      { name: "Fire Immunity", probability: 25, statBonus: { strength: 12, magic: 8 }, description: "Immune to all flames", color: "#FF6347" },
      { name: "Metal Shaping", probability: 20, statBonus: { intelligence: 20, magic: 10 }, description: "Mold metal with mind", color: "#B8860B" },
      { name: "Forge Magic", probability: 15, statBonus: { intelligence: 25, magic: 15 }, description: "Enchant while crafting", color: "#4682B4" },
      { name: "Divine Craftsman", probability: 10, statBonus: { intelligence: 35, strength: 25, magic: 20 }, description: "Create artifacts of power", color: "#FFD700" }
    ],
    "Battle Dwarf": [
      { name: "Berserker's Fury", probability: 30, statBonus: { strength: 25, speed: 5 }, description: "Unstoppable battle rage", color: "#8B0000" },
      { name: "Weapon Bond", probability: 25, statBonus: { strength: 20, intelligence: 5 }, description: "One with your weapon", color: "#A0522D" },
      { name: "Battle Cry", probability: 20, statBonus: { strength: 18, magic: 7 }, description: "Rallying war shout", color: "#DC143C" },
      { name: "Endless Stamina", probability: 15, statBonus: { strength: 22, speed: 13 }, description: "Never tire in battle", color: "#B22222" },
      { name: "War God", probability: 10, statBonus: { strength: 45, speed: 20, intelligence: 15 }, description: "Divine warrior spirit", color: "#FFD700" }
    ],
    "Rune Dwarf": [
      { name: "Rune Crafting", probability: 30, statBonus: { intelligence: 18, magic: 12 }, description: "Carve magical symbols", color: "#4682B4" },
      { name: "Ancient Scripts", probability: 25, statBonus: { intelligence: 20, magic: 10 }, description: "Read forgotten languages", color: "#5F9EA0" },
      { name: "Protective Wards", probability: 20, statBonus: { magic: 22, intelligence: 8 }, description: "Create magical barriers", color: "#87CEEB" },
      { name: "Runic Power", probability: 15, statBonus: { magic: 25, intelligence: 15 }, description: "Channel runic energy", color: "#6495ED" },
      { name: "Runemaster", probability: 10, statBonus: { intelligence: 40, magic: 40, strength: 15 }, description: "Master of all runes", color: "#FFD700" }
    ],
    "King Dwarf": [
      { name: "Royal Command", probability: 25, statBonus: { intelligence: 25, strength: 15 }, description: "Authority over all dwarves", color: "#FFD700" },
      { name: "Crown's Power", probability: 25, statBonus: { magic: 25, intelligence: 15 }, description: "Ancient crown magic", color: "#FFA500" },
      { name: "Kingly Strength", probability: 20, statBonus: { strength: 30, intelligence: 10 }, description: "Power befitting royalty", color: "#DAA520" },
      { name: "Divine Right", probability: 15, statBonus: { strength: 25, magic: 25, intelligence: 20 }, description: "Blessed by dwarf gods", color: "#F0E68C" },
      { name: "Eternal King", probability: 15, statBonus: { strength: 50, intelligence: 50, magic: 40 }, description: "Immortal dwarf sovereign", color: "#FFFAF0" }
    ]
  },
  Dragon: {
    "Fire Dragon": [
      { name: "Flame Breath", probability: 30, statBonus: { strength: 20, magic: 15 }, description: "Devastating fire attack", color: "#FF4500" },
      { name: "Heat Aura", probability: 25, statBonus: { strength: 15, magic: 18 }, description: "Burn everything nearby", color: "#FF6347" },
      { name: "Molten Scales", probability: 20, statBonus: { strength: 18, magic: 12 }, description: "Armor of living fire", color: "#DC143C" },
      { name: "Inferno Storm", probability: 15, statBonus: { strength: 25, magic: 25 }, description: "Rain fire from sky", color: "#B22222" },
      { name: "Solar Dragon", probability: 10, statBonus: { strength: 40, magic: 45, intelligence: 25 }, description: "Power of a star", color: "#FFD700" }
    ],
    "Ice Dragon": [
      { name: "Frost Breath", probability: 30, statBonus: { intelligence: 18, magic: 17 }, description: "Freeze everything solid", color: "#87CEEB" },
      { name: "Ice Shield", probability: 25, statBonus: { intelligence: 15, magic: 20 }, description: "Impenetrable ice armor", color: "#B0E0E6" },
      { name: "Blizzard Call", probability: 20, statBonus: { intelligence: 20, magic: 15 }, description: "Summon deadly storms", color: "#E0FFFF" },
      { name: "Absolute Zero", probability: 15, statBonus: { intelligence: 25, magic: 30 }, description: "Stop all motion", color: "#F0F8FF" },
      { name: "Eternal Winter", probability: 10, statBonus: { intelligence: 45, magic: 50, speed: 25 }, description: "Bring the ice age", color: "#FFD700" }
    ],
    "Lightning Dragon": [
      { name: "Lightning Breath", probability: 30, statBonus: { speed: 25, magic: 10 }, description: "Electric devastation", color: "#9932CC" },
      { name: "Storm Wings", probability: 25, statBonus: { speed: 22, magic: 13 }, description: "Fly at light speed", color: "#8A2BE2" },
      { name: "Thunder Roar", probability: 20, statBonus: { speed: 18, magic: 17 }, description: "Deafening sonic attack", color: "#9400D3" },
      { name: "Chain Lightning", probability: 15, statBonus: { speed: 20, magic: 25 }, description: "Lightning jumps between foes", color: "#7B68EE" },
      { name: "Storm Lord", probability: 10, statBonus: { speed: 50, magic: 40, intelligence: 30 }, description: "Command all weather", color: "#FFD700" }
    ],
    "Shadow Dragon": [
      { name: "Shadow Breath", probability: 30, statBonus: { intelligence: 22, magic: 18 }, description: "Breath of pure darkness", color: "#2F2F2F" },
      { name: "Void Scales", probability: 25, statBonus: { intelligence: 18, magic: 22 }, description: "Absorb all light", color: "#191970" },
      { name: "Nightmare Aura", probability: 20, statBonus: { intelligence: 20, magic: 20 }, description: "Induce terrifying visions", color: "#483D8B" },
      { name: "Reality Tear", probability: 15, statBonus: { intelligence: 30, magic: 25 }, description: "Rip holes in space", color: "#4B0082" },
      { name: "Void Dragon", probability: 10, statBonus: { intelligence: 50, magic: 55, strength: 30 }, description: "Embody nothingness itself", color: "#000000" }
    ],
    "Cosmic Dragon": [
      { name: "Star Breath", probability: 25, statBonus: { strength: 30, magic: 25 }, description: "Breathe stellar fire", color: "#4B0082" },
      { name: "Gravity Control", probability: 25, statBonus: { intelligence: 35, magic: 20 }, description: "Manipulate space-time", color: "#6A5ACD" },
      { name: "Cosmic Awareness", probability: 20, statBonus: { intelligence: 40, magic: 15 }, description: "Know all in universe", color: "#483D8B" },
      { name: "Galaxy Wings", probability: 15, statBonus: { speed: 40, magic: 35 }, description: "Travel between stars", color: "#9370DB" },
      { name: "Universe Dragon", probability: 15, statBonus: { strength: 60, intelligence: 60, magic: 70, speed: 50 }, description: "Power of creation itself", color: "#FFD700" }
    ]
  },
  Phoenix: {
    "Fire Phoenix": [
      { name: "Rebirth Flame", probability: 30, statBonus: { magic: 20, intelligence: 10 }, description: "Rise from ashes stronger", color: "#FF4500" },
      { name: "Healing Fire", probability: 25, statBonus: { magic: 18, speed: 12 }, description: "Fire that heals instead of burns", color: "#FF6347" },
      { name: "Phoenix Cry", probability: 20, statBonus: { speed: 20, magic: 15 }, description: "Inspiring battle song", color: "#FFA500" },
      { name: "Eternal Flame", probability: 15, statBonus: { magic: 30, intelligence: 15 }, description: "Fire that never dies", color: "#DC143C" },
      { name: "Solar Phoenix", probability: 10, statBonus: { magic: 45, speed: 35, intelligence: 25 }, description: "Born from the sun", color: "#FFD700" }
    ],
    "Ice Phoenix": [
      { name: "Frost Rebirth", probability: 30, statBonus: { intelligence: 25, magic: 10 }, description: "Reborn in ice and snow", color: "#00CED1" },
      { name: "Crystal Feathers", probability: 25, statBonus: { intelligence: 20, speed: 15 }, description: "Feathers sharp as diamonds", color: "#B0E0E6" },
      { name: "Glacial Cry", probability: 20, statBonus: { intelligence: 22, magic: 13 }, description: "Freeze enemies with song", color: "#87CEEB" },
      { name: "Absolute Rebirth", probability: 15, statBonus: { intelligence: 30, magic: 25 }, description: "Reborn at absolute zero", color: "#E0FFFF" },
      { name: "Cosmic Ice Phoenix", probability: 10, statBonus: { intelligence: 50, magic: 40, speed: 35 }, description: "Ice of deep space", color: "#FFD700" }
    ],
    "Thunder Phoenix": [
      { name: "Lightning Rebirth", probability: 30, statBonus: { speed: 30, magic: 10 }, description: "Reborn from storm", color: "#FFD700" },
      { name: "Storm Feathers", probability: 25, statBonus: { speed: 25, magic: 15 }, description: "Feathers crackle with electricity", color: "#9932CC" },
      { name: "Thunder Cry", probability: 20, statBonus: { speed: 28, intelligence: 12 }, description: "Voice like thunder", color: "#8A2BE2" },
      { name: "Hurricane Wings", probability: 15, statBonus: { speed: 35, magic: 20 }, description: "Wings create tornadoes", color: "#7B68EE" },
      { name: "Storm Phoenix", probability: 10, statBonus: { speed: 55, magic: 35, intelligence: 30 }, description: "Master of all storms", color: "#6495ED" }
    ],
    "Celestial Phoenix": [
      { name: "Divine Rebirth", probability: 25, statBonus: { intelligence: 30, magic: 20 }, description: "Blessed resurrection", color: "#F0F8FF" },
      { name: "Heavenly Cry", probability: 25, statBonus: { intelligence: 25, magic: 25 }, description: "Song of the angels", color: "#FFFAF0" },
      { name: "Star Feathers", probability: 20, statBonus: { magic: 30, speed: 15 }, description: "Feathers made of starlight", color: "#FFE4E1" },
      { name: "Divine Authority", probability: 15, statBonus: { intelligence: 35, magic: 30 }, description: "Command of heavenly forces", color: "#FFF8DC" },
      { name: "Seraph Phoenix", probability: 15, statBonus: { intelligence: 55, magic: 60, speed: 40 }, description: "Highest angelic form", color: "#FFD700" }
    ],
    "Void Phoenix": [
      { name: "Void Rebirth", probability: 25, statBonus: { intelligence: 35, magic: 25 }, description: "Reborn from nothingness", color: "#191970" },
      { name: "Reality Feathers", probability: 25, statBonus: { intelligence: 30, magic: 30 }, description: "Feathers that warp reality", color: "#4B0082" },
      { name: "Entropy Cry", probability: 20, statBonus: { intelligence: 32, magic: 28 }, description: "Song that unmakes reality", color: "#483D8B" },
      { name: "Null Space Wings", probability: 15, statBonus: { magic: 40, speed: 30 }, description: "Wings that erase space", color: "#2F2F2F" },
      { name: "Cosmic Void Phoenix", probability: 15, statBonus: { intelligence: 70, magic: 75, strength: 40, speed: 45 }, description: "Phoenix of the cosmic void", color: "#000000" }
    ]
  }
};